from __future__ import annotations

import math
from dataclasses import dataclass
from pathlib import Path
from typing import Final

import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.figure import Figure
from matplotlib.font_manager import FontProperties
from matplotlib.lines import Line2D

COLUMNS: Final[list[str]] = [
    "trial_id",
    "pair_id",
    "condition",
    "task_id",
    "started_at",
    "setup_human_minutes",
    "research_human_minutes",
    "supervision_human_minutes",
    "correction_human_minutes",
    "recovery_human_minutes",
    "elapsed_minutes",
    "interruptions_count",
    "accepted",
    "quality_notes",
    "model",
    "skills_revision",
    "sources_cutoff",
    "notes",
]
HUMAN_STAGES: Final[list[str]] = [
    "setup_human_minutes",
    "research_human_minutes",
    "supervision_human_minutes",
    "correction_human_minutes",
    "recovery_human_minutes",
]
NUMERIC_COLUMNS: Final[list[str]] = [*HUMAN_STAGES, "elapsed_minutes"]
PAIR_COLUMNS: Final[list[str]] = [
    "pair_id",
    "human_task_id",
    "agent_task_id",
    "human_attempts",
    "agent_attempts",
    "human_accepted",
    "agent_accepted",
    "human_total_minutes",
    "agent_total_minutes",
    "absolute_minutes_saved",
    "percent_human_time_saved",
    "comparison_status",
    "exclusion_reason",
]


class ValidationError(ValueError):
    """Raised when a trial log violates the preregistered schema."""


@dataclass(frozen=True)
class AnalysisResult:
    status: str
    counts: dict[str, int]
    attempts: pd.DataFrame
    pairs: pd.DataFrame
    missing_items: list[str]


def _blank(value: object) -> bool:
    return value is None or (isinstance(value, str) and not value.strip())


def load_trials(path: str | Path) -> pd.DataFrame:
    """Read and validate a v1 pilot CSV without converting blanks to zero."""
    frame = pd.read_csv(Path(path), dtype=str, keep_default_na=False)
    actual_columns = list(frame.columns)
    if actual_columns != COLUMNS:
        missing_columns = [column for column in COLUMNS if column not in actual_columns]
        extra_columns = [column for column in actual_columns if column not in COLUMNS]
        problems: list[str] = []
        if missing_columns:
            problems.append(f"缺少列：{', '.join(missing_columns)}")
        if extra_columns:
            problems.append(f"多余列：{', '.join(extra_columns)}")
        if not missing_columns and not extra_columns:
            problems.append("列顺序与试点 schema 不一致")
        raise ValidationError("；".join(problems))
    frame = frame[COLUMNS].copy()
    if frame.empty:
        return frame

    for field in ("trial_id", "pair_id", "condition", "task_id"):
        blank_rows = frame.index[frame[field].map(_blank)].tolist()
        if blank_rows:
            raise ValidationError(f"{field} 不能为空（行 {blank_rows[0] + 2}）")
    duplicates = frame.loc[
        frame["trial_id"].duplicated(keep=False), "trial_id"
    ].unique()
    if len(duplicates):
        raise ValidationError(f"trial_id 重复：{', '.join(duplicates)}")
    invalid_conditions = sorted(set(frame["condition"]) - {"human", "agent"})
    if invalid_conditions:
        raise ValidationError(f"非法 condition：{', '.join(invalid_conditions)}")
    invalid_accepted = sorted(set(frame["accepted"]) - {"true", "false", "unknown"})
    if invalid_accepted:
        raise ValidationError(f"非法 accepted：{', '.join(invalid_accepted)}")

    for field in NUMERIC_COLUMNS:
        converted: list[float | None] = []
        for offset, raw in enumerate(frame[field], start=2):
            if _blank(raw):
                converted.append(None)
                continue
            if raw.strip().lower() in {
                "nan",
                "+nan",
                "-nan",
                "inf",
                "+inf",
                "-inf",
                "infinity",
                "+infinity",
                "-infinity",
            }:
                raise ValidationError(f"{field} 不接受 NaN/inf 字面值（行 {offset}）")
            try:
                value = float(raw)
            except ValueError as exc:
                raise ValidationError(
                    f"{field} 必须是数值或留空（行 {offset}）"
                ) from exc
            if not math.isfinite(value):
                raise ValidationError(f"{field} 必须是有限数值（行 {offset}）")
            if value < 0:
                raise ValidationError(f"{field} 不能为负数（行 {offset}）")
            converted.append(value)
        frame[field] = pd.Series(converted, dtype="Float64")

    interruptions: list[int | None] = []
    for offset, raw in enumerate(frame["interruptions_count"], start=2):
        if _blank(raw):
            interruptions.append(None)
            continue
        if raw.strip().lower() in {"nan", "inf", "infinity"}:
            raise ValidationError(f"interruptions_count 必须是非负整数（行 {offset}）")
        try:
            value = float(raw)
        except ValueError as exc:
            raise ValidationError(
                f"interruptions_count 必须是非负整数（行 {offset}）"
            ) from exc
        if not math.isfinite(value):
            raise ValidationError(f"interruptions_count 必须是有限数值（行 {offset}）")
        if value < 0 or not value.is_integer():
            raise ValidationError(f"interruptions_count 必须是非负整数（行 {offset}）")
        interruptions.append(int(value))
    frame["interruptions_count"] = pd.Series(interruptions, dtype="Int64")
    frame["accepted"] = (
        frame["accepted"]
        .map({"true": True, "false": False, "unknown": None})
        .astype(object)
    )
    return frame


def _attempt_table(frame: pd.DataFrame) -> tuple[pd.DataFrame, list[str]]:
    attempts = frame.copy()
    if attempts.empty:
        attempts["total_human_minutes"] = pd.Series(dtype="Float64")
        return attempts, ["尚无试次记录"]
    attempts["total_human_minutes"] = (
        attempts[HUMAN_STAGES]
        .sum(axis=1, min_count=len(HUMAN_STAGES))
        .astype("Float64")
    )
    missing_items: list[str] = []
    for _, trial in attempts.iterrows():
        missing = [
            field
            for field in [*HUMAN_STAGES, "interruptions_count"]
            if pd.isna(trial[field])
        ]
        if missing:
            missing_items.append(f"{trial['trial_id']}：缺少 {', '.join(missing)}")
    return attempts, missing_items


def _pair_table(attempts: pd.DataFrame) -> pd.DataFrame:
    records: list[dict[str, object]] = []
    for pair_id, group in attempts.groupby("pair_id", sort=False):
        by_condition = {
            name: part for name, part in group.groupby("condition", sort=False)
        }
        reasons: list[str] = []
        task_ids: dict[str, list[str]] = {}
        success_counts: dict[str, int] = {}
        for condition in ("human", "agent"):
            part = by_condition.get(condition)
            task_ids[condition] = (
                [] if part is None else list(dict.fromkeys(part["task_id"]))
            )
            success_counts[condition] = (
                0
                if part is None
                else int(part["accepted"].map(lambda value: value is True).sum())
            )
            if part is None or success_counts[condition] == 0:
                reasons.append("两个条件均须至少一次验收通过")
            if len(task_ids[condition]) > 1:
                reasons.append("同一条件的重试必须使用同一 task_id")
            if success_counts[condition] > 1:
                reasons.append("同一条件出现多次 accepted=true")
            if part is not None:
                acceptance = list(part["accepted"])
                first_success = next(
                    (index for index, value in enumerate(acceptance) if value is True),
                    None,
                )
                if first_success is not None and first_success < len(acceptance) - 1:
                    reasons.append("验收通过后仍有后续尝试")
        if len(task_ids["human"]) == 1 and task_ids["human"] == task_ids["agent"]:
            reasons.append("两个条件必须使用不同 task_id")
        if not group[HUMAN_STAGES].notna().all(axis=None):
            reasons.append("人工阶段记录不完整")

        human = by_condition.get("human", attempts.iloc[0:0])
        agent = by_condition.get("agent", attempts.iloc[0:0])
        human_total = (
            human["total_human_minutes"].sum(min_count=len(human))
            if len(human)
            else pd.NA
        )
        agent_total = (
            agent["total_human_minutes"].sum(min_count=len(agent))
            if len(agent)
            else pd.NA
        )
        eligible = not reasons
        absolute: object = pd.NA
        percent: object = pd.NA
        status = "comparable" if eligible else "incomplete"
        if eligible:
            absolute = float(human_total - agent_total)
            if human_total == 0:
                reasons.append("人工基线为 0，百分比未知")
            else:
                percent = float(absolute / human_total * 100)
        records.append(
            {
                "pair_id": pair_id,
                "human_task_id": ", ".join(task_ids["human"]),
                "agent_task_id": ", ".join(task_ids["agent"]),
                "human_attempts": len(human),
                "agent_attempts": len(agent),
                "human_accepted": success_counts["human"],
                "agent_accepted": success_counts["agent"],
                "human_total_minutes": human_total,
                "agent_total_minutes": agent_total,
                "absolute_minutes_saved": absolute,
                "percent_human_time_saved": percent,
                "comparison_status": status,
                "exclusion_reason": "；".join(dict.fromkeys(reasons)),
            }
        )
    return pd.DataFrame(records, columns=PAIR_COLUMNS)


def analyze_trials(frame: pd.DataFrame) -> AnalysisResult:
    attempts, missing_items = _attempt_table(frame)
    if attempts.empty:
        return AnalysisResult(
            "unmeasured",
            {"total": 0, "accepted": 0, "failed": 0, "unknown": 0},
            attempts,
            pd.DataFrame(columns=PAIR_COLUMNS),
            missing_items,
        )
    counts = {
        "total": len(attempts),
        "accepted": int(attempts["accepted"].map(lambda value: value is True).sum()),
        "failed": int(attempts["accepted"].map(lambda value: value is False).sum()),
        "unknown": int(attempts["accepted"].map(lambda value: value is None).sum()),
    }
    return AnalysisResult(
        "measured", counts, attempts, _pair_table(attempts), missing_items
    )


def configure_font(font_path: str | Path | None) -> FontProperties | None:
    """Return an optional font without relying on a machine-specific path."""
    if not font_path:
        return None
    path = Path(font_path).expanduser()
    return FontProperties(fname=path) if path.is_file() else None


def make_figures(
    result: AnalysisResult,
    *,
    banner: str | None = None,
    font_path: str | Path | None = None,
) -> dict[str, Figure]:
    """Create honest zero-based figures; return none when there are no observations."""
    if result.attempts.empty:
        return {}
    font = configure_font(font_path)
    title_font = {"fontproperties": font} if font else {}
    palette = {
        "ink": "#17232E",
        "purple": "#433C53",
        "blue": "#285ACA",
        "paper": "#F4F6F8",
    }
    figures: dict[str, Figure] = {}
    with plt.rc_context(
        {
            "figure.facecolor": palette["paper"],
            "axes.facecolor": palette["paper"],
            "axes.edgecolor": palette["ink"],
            "text.color": palette["ink"],
            "axes.labelcolor": palette["ink"],
            "xtick.color": palette["ink"],
            "ytick.color": palette["ink"],
        }
    ):
        fig, ax = plt.subplots(figsize=(8, 4.8), layout="constrained")
        tick_labels: list[str] = []
        for x, (_, trial) in enumerate(result.attempts.iterrows()):
            value = trial["total_human_minutes"]
            if pd.isna(value):
                tick_labels.append(f"{trial['trial_id']}\nMISSING")
            else:
                tick_labels.append(str(trial["trial_id"]))
                accepted = trial["accepted"]
                marker = "o" if accepted is True else "X" if accepted is False else "D"
                color = palette["blue"] if accepted is True else palette["purple"]
                ax.scatter(x, value, marker=marker, color=color, s=75)
        ax.set(
            xlabel="Trial (CSV row order)",
            ylabel="Human time (minutes)",
            ylim=(0, None),
            xticks=range(len(result.attempts)),
            xticklabels=tick_labels,
        )
        ax.grid(axis="y", alpha=0.25)
        handles = [
            Line2D(
                [],
                [],
                marker="o",
                linestyle="none",
                color=palette["blue"],
                label="PASS",
            ),
            Line2D(
                [],
                [],
                marker="X",
                linestyle="none",
                color=palette["purple"],
                label="FAIL",
            ),
            Line2D(
                [],
                [],
                marker="D",
                linestyle="none",
                color=palette["purple"],
                label="UNKNOWN",
            ),
        ]
        ax.legend(handles=handles, title="Acceptance status")
        if banner:
            fig.suptitle(
                f"{banner}\nHuman time by trial",
                color=palette["purple"],
                fontsize=10,
                fontweight="bold",
            )
        else:
            ax.set_title("Human time by trial", **title_font)
        figures["attempts"] = fig

        comparable = result.pairs[result.pairs["comparison_status"] == "comparable"]
        if not comparable.empty:
            fig, ax = plt.subplots(figsize=(8, 4.8), layout="constrained")
            positions = list(range(len(comparable)))
            ax.bar(
                [x - 0.2 for x in positions],
                comparable["human_total_minutes"],
                width=0.4,
                label="Human",
                color=palette["purple"],
                hatch="//",
            )
            ax.bar(
                [x + 0.2 for x in positions],
                comparable["agent_total_minutes"],
                width=0.4,
                label="Agent-assisted",
                color=palette["blue"],
                hatch="..",
            )
            ax.set(
                xlabel="Preregistered pair",
                ylabel="Cumulative human time (minutes)",
                ylim=(0, None),
                xticks=positions,
                xticklabels=comparable["pair_id"],
            )
            ax.legend()
            ax.grid(axis="y", alpha=0.25)
            if banner:
                fig.suptitle(
                    f"{banner}\nComparable pair totals",
                    color=palette["purple"],
                    fontsize=10,
                    fontweight="bold",
                )
            else:
                ax.set_title("Comparable pair totals", **title_font)
            figures["pairs"] = fig
    return figures
