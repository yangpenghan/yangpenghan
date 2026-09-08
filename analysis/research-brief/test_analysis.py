from __future__ import annotations

from pathlib import Path

import pandas as pd
import pytest

from analysis import ValidationError, analyze_trials, load_trials, make_figures

COLUMNS = [
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


def write_csv(path: Path, rows: list[dict[str, object]]) -> Path:
    pd.DataFrame(rows, columns=COLUMNS).to_csv(path, index=False)
    return path


def row(**overrides: object) -> dict[str, object]:
    base: dict[str, object] = {
        "trial_id": "T001",
        "pair_id": "P01",
        "condition": "human",
        "task_id": "R01",
        "started_at": "2026-09-09T09:00:00+08:00",
        "setup_human_minutes": 2,
        "research_human_minutes": 20,
        "supervision_human_minutes": 0,
        "correction_human_minutes": 3,
        "recovery_human_minutes": 0,
        "elapsed_minutes": 30,
        "interruptions_count": 1,
        "accepted": "true",
        "quality_notes": "通过",
        "model": "none",
        "skills_revision": "none",
        "sources_cutoff": "2026-09-08",
        "notes": "",
    }
    base.update(overrides)
    return base


def test_empty_template_returns_unmeasured(tmp_path: Path) -> None:
    frame = load_trials(write_csv(tmp_path / "trials.csv", []))
    result = analyze_trials(frame)

    assert result.status == "unmeasured"
    assert result.counts == {"total": 0, "accepted": 0, "failed": 0, "unknown": 0}
    assert result.attempts.empty
    assert result.pairs.empty
    assert result.missing_items == ["尚无试次记录"]


@pytest.mark.parametrize(
    ("field", "value", "message"),
    [
        ("research_human_minutes", -1, "不能为负数"),
        ("elapsed_minutes", "NaN", "NaN/inf"),
        ("setup_human_minutes", "inf", "NaN/inf"),
        ("interruptions_count", 1.5, "非负整数"),
        ("condition", "hybrid", "condition"),
        ("accepted", "yes", "accepted"),
    ],
)
def test_invalid_values_are_rejected(
    tmp_path: Path, field: str, value: object, message: str
) -> None:
    path = write_csv(tmp_path / "trials.csv", [row(**{field: value})])

    with pytest.raises(ValidationError, match=message):
        load_trials(path)


def test_duplicate_trial_id_is_rejected(tmp_path: Path) -> None:
    path = write_csv(
        tmp_path / "trials.csv",
        [row(), row(condition="agent", task_id="R02")],
    )

    with pytest.raises(ValidationError, match="trial_id.*重复"):
        load_trials(path)


def test_missing_stage_makes_total_missing_but_failure_is_retained(
    tmp_path: Path,
) -> None:
    path = write_csv(
        tmp_path / "trials.csv",
        [row(accepted="false", correction_human_minutes="")],
    )

    result = analyze_trials(load_trials(path))

    assert result.counts == {"total": 1, "accepted": 0, "failed": 1, "unknown": 0}
    assert pd.isna(result.attempts.loc[0, "total_human_minutes"])
    assert result.attempts.loc[0, "accepted"] is False
    assert "T001：缺少 correction_human_minutes" in result.missing_items


def test_complete_pair_uses_all_attempt_costs_and_hand_calculated_savings(
    tmp_path: Path,
) -> None:
    rows = [
        row(trial_id="H1", accepted="false", research_human_minutes=10),
        row(trial_id="H2", accepted="true", research_human_minutes=20),
        row(
            trial_id="A1",
            condition="agent",
            task_id="R02",
            accepted="false",
            setup_human_minutes=3,
            research_human_minutes=4,
            supervision_human_minutes=5,
            correction_human_minutes=6,
            recovery_human_minutes=7,
        ),
        row(
            trial_id="A2",
            condition="agent",
            task_id="R02",
            accepted="true",
            setup_human_minutes=1,
            research_human_minutes=2,
            supervision_human_minutes=3,
            correction_human_minutes=4,
            recovery_human_minutes=0,
        ),
    ]

    result = analyze_trials(load_trials(write_csv(tmp_path / "trials.csv", rows)))
    pair = result.pairs.iloc[0]

    # Human totals: (2+10+0+3+0) + (2+20+0+3+0) = 40.
    # Agent totals: (3+4+5+6+7) + (1+2+3+4+0) = 35.
    assert pair["human_attempts"] == 2
    assert pair["agent_attempts"] == 2
    assert pair["human_total_minutes"] == 40
    assert pair["agent_total_minutes"] == 35
    assert pair["absolute_minutes_saved"] == 5
    assert pair["percent_human_time_saved"] == pytest.approx(12.5)
    assert pair["comparison_status"] == "comparable"


@pytest.mark.parametrize(
    ("rows", "reason"),
    [
        (
            [
                row(),
                row(trial_id="A1", condition="agent", task_id="R02", accepted="false"),
            ],
            "两个条件均须至少一次验收通过",
        ),
        (
            [
                row(),
                row(
                    trial_id="A1",
                    condition="agent",
                    task_id="R02",
                    setup_human_minutes="",
                ),
            ],
            "人工阶段记录不完整",
        ),
        (
            [
                row(),
                row(trial_id="H2", task_id="R03"),
                row(trial_id="A1", condition="agent", task_id="R02"),
            ],
            "同一条件的重试必须使用同一 task_id",
        ),
        (
            [row(), row(trial_id="A1", condition="agent", task_id="R01")],
            "两个条件必须使用不同 task_id",
        ),
        (
            [
                row(),
                row(trial_id="H2"),
                row(trial_id="A1", condition="agent", task_id="R02"),
            ],
            "同一条件出现多次 accepted=true",
        ),
    ],
)
def test_ineligible_pairs_are_reported_not_compared(
    tmp_path: Path, rows: list[dict[str, object]], reason: str
) -> None:
    result = analyze_trials(load_trials(write_csv(tmp_path / "trials.csv", rows)))
    pair = result.pairs.iloc[0]

    assert pair["comparison_status"] == "incomplete"
    assert reason in pair["exclusion_reason"]
    assert pd.isna(pair["percent_human_time_saved"])


def test_zero_human_baseline_has_absolute_difference_but_no_percentage(
    tmp_path: Path,
) -> None:
    human = row(
        setup_human_minutes=0,
        research_human_minutes=0,
        supervision_human_minutes=0,
        correction_human_minutes=0,
        recovery_human_minutes=0,
    )
    agent = row(
        trial_id="A1",
        condition="agent",
        task_id="R02",
        setup_human_minutes=1,
        research_human_minutes=0,
        supervision_human_minutes=0,
        correction_human_minutes=0,
        recovery_human_minutes=0,
    )
    pair = analyze_trials(
        load_trials(write_csv(tmp_path / "trials.csv", [human, agent]))
    ).pairs.iloc[0]
    assert pair["absolute_minutes_saved"] == -1
    assert pd.isna(pair["percent_human_time_saved"])
    assert "人工基线为 0" in pair["exclusion_reason"]


def test_unknown_acceptance_is_counted(tmp_path: Path) -> None:
    result = analyze_trials(
        load_trials(write_csv(tmp_path / "trials.csv", [row(accepted="unknown")]))
    )
    assert result.counts == {"total": 1, "accepted": 0, "failed": 0, "unknown": 1}


def test_attempt_figure_labels_status_and_does_not_plot_missing_as_zero(
    tmp_path: Path,
) -> None:
    rows = [row(accepted="false"), row(trial_id="M1", correction_human_minutes="")]
    result = analyze_trials(load_trials(write_csv(tmp_path / "trials.csv", rows)))

    figure = make_figures(result)["attempts"]
    axis = figure.axes[0]

    assert axis.get_xlabel() == "Trial (CSV row order)"
    assert [tick.get_text() for tick in axis.get_xticklabels()] == [
        "T001",
        "M1\nMISSING",
    ]
    assert [text.get_text() for text in axis.get_legend().get_texts()] == [
        "PASS",
        "FAIL",
        "UNKNOWN",
    ]
    assert len(axis.collections) == 1
