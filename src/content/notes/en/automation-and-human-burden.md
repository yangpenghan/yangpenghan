---
title: "What has an agent automated if someone must keep watching it?"
description: "Background execution is a beginning. Configuration, supervision, recovery, and interruptions must count when evaluating whether automation makes work easier."
publishDate: 2026-09-06
locale: en
kind: proposal
category: agentic-ai
categoryLabel: AI systems & human collaboration
readingMinutes: 6
featured: true
relatedWork: ai-agent-system
---

The workflow I want is straightforward: open the editor, connect to the repository, enter the conversation, and continue. If sustained execution requires more terminal commands, several session states, and manual recovery, I want to ask whether my work has actually decreased.

A background process staying alive solves part of execution. Being able to leave, return, understand progress, and recover from an error are additional problems.

I want to bring a human-factors perspective to agents: **evaluation must account for the work automation leaves to people.**

## Maintenance is not free background activity

Imagine an automated research briefing. Previously, manual preparation took a continuous period of time. Now it runs itself but needs daily checks for disconnections, changed sources, and duplicate results.

Even a short check can interrupt another task. There is also the burden of remembering that a system may need attention.

I would distinguish initial setup, preparation per task, supervision, review, and recovery. One-time and recurring work need separate records, with an identified owner.

As an evaluation framework, the net change compares previous human effort with new and retained effort. Interruptions need not be forced into the same time total: intervention frequency, timing, and urgency can be recorded separately.

A system that reduces processing time while introducing unpredictable interruptions may still be unsuitable for the user's working pattern.

## What remains may be the hardest work

Bainbridge discusses how automation can enlarge human operational problems, including supervision and abnormal-condition handling. Her paper concerns industrial automation; applying its questions to agents is my methodological extension. [Ironies of Automation, 1983](https://doi.org/10.1016/0005-1098(83)90046-8)

During successful execution, a person need not follow every step. During failure, they may suddenly need to know what was read, changed, and inferred. Without adequate records, the person taking over can have less context than someone executing manually from the start.

“A human will handle exceptions” is therefore incomplete. That person needs the failure location, completed and pending actions, and a way to understand what can safely continue.

## Status should explain the next action

“Running” can mean downloading, waiting on a service, retrying repeatedly, needing missing information, or making no useful progress. One label leaves diagnosis to the user.

I would want status to explain where the process has reached, what it is waiting for, whether action is needed, and where it will resume. Detail can be layered: show what is needed for the next decision, with a fuller record available when useful.

A progress percentage also needs a basis. For an open-ended research task, “87% complete” may be less informative than “sources screened; checking three conflicting findings.” Useful feedback reduces guessing.

## Test recovery by interrupting work

A process that can restart is not necessarily able to recover safely. If it already wrote records, created tasks, or sent notifications, repeating execution can duplicate effects.

I would distinguish repeatable reads from changes to external state, retain completion records, and inspect actual state when the previous outcome is uncertain. Continuation should begin from a confirmed position.

For users, the important experience is knowing what has happened and what remains, without a retry repeating consequential actions. The underlying mechanism matters insofar as it provides that behavior.

Successful demonstrations are insufficient. Missing sources, interrupted connections, and tool failures should reveal how much diagnosis people must do, whether messages are understandable, and whether the recovered result remains consistent.

## Intervention should match the consequence

Zero intervention is not the only definition of good automation. Reviewing an anomaly that affects a research conclusion serves a different purpose from approving a routine read.

I would distinguish supplying unavailable facts, judging a tradeoff without a fixed answer, and authorizing an external action. Each intervention should include what the person needs to complete it.

Repeatedly asking for already supplied conditions, or handing users errors the system could inspect, points to process defects. Reducing those interruptions preserves attention for consequential judgment.

Never asking is not automatically better. Crossing a boundary incorrectly can replace visible approval time with larger repair costs later.

## Compare the whole experience of use

I would give two approaches the same real tasks and the same exceptions. Alongside quality and elapsed time, record interventions, demands for immediate attention, recovery steps, and whether status is understandable after time away.

The evaluation period should include ordinary use, not only the best minutes after setup. Maintenance responsibility, update frequency, and handover to another colleague affect continued value.

These are proposed acceptance dimensions, not demonstrated results for my current system. For infrequent tasks, straightforward manual work may remain easier. Frequent, stable tasks provide a stronger reason to invest in recovery and feedback.

What I want from an agent is continuity: easy to start, possible to leave, understandable on return, and recoverable when something fails. [Stable technical delivery](../engineering-for-delivery/) should enable people to work steadily too.
