# Agent human-workload evaluation worksheet

Status: Blank template · 2026-09-06

An evaluation method awaiting real observations, not a measured time-saving result from my personal AI system. The companion CSV contains fields only, with no measured data.

## Comparison conditions

- Specific task and a shared acceptance standard:
- Manual or simple-tool baseline:
- Agent version, tools, permissions, and environment:
- Task sample / observation period:
- How tasks are selected without retaining only successes:

## Record each task

Use agent-workload.csv in the same directory. Record time in minutes. Leave unknown values empty, not zero. Keep elapsed runtime separate from human time; do not simply add them. Note overlapping activities.

- baseline_human_minutes: actual human work under the baseline.
- setup_human_minutes: setup time for this task; document how shared setup is allocated.
- supervision_human_minutes: human time spent checking or required to stay attentive.
- correction_human_minutes: rewriting, correcting, and rerunning.
- recovery_human_minutes: failure recovery, rollback, and remediation.
- agent_elapsed_minutes: elapsed time from start to finish.
- interruptions_count: occasions requiring a person to return; record the reason.
- accepted: whether the shared acceptance standard was met; retain failed tasks.

## Before summarizing

1. Compare matching tasks and quality requirements; describe difficulty and sampling limitations.
2. Examine completion and rework before human time. An unfinished task cannot count as saving all baseline time.
3. State setup allocation, missing records, and remaining human judgment.
4. Record perceived effort separately. Task counts do not measure attention burden.

Next decision: continue / adjust permissions or workflow / return to a simpler tool. Record the reason and next review date.

## Public-source research brief pilot

To run a paired pilot, start with the [research-brief pilot method](https://github.com/yangpenghan/yangpenghan/tree/main/analysis/research-brief#readme). It retains failures and retries and excludes incomplete pairs from percentage-saved calculations. The working materials are in Chinese.
