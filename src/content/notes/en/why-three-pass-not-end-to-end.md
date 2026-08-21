---
title: "Why three passes, not end to end"
description: "From manual behavior coding in 2015 to AI-assisted coding in 2026: why manual coding is both irreplaceable and unsustainable, and why inspectable, recoverable automation beats one-shot models."
publishDate: 2026-08-21
locale: en
category: behavioral-intelligence
categoryLabel: Behavioral intelligence
readingMinutes: 7
featured: true
relatedWork: behaviorlens
---

When I started coding behavior in 2015, the tool was Observer XT. A twenty-minute video meant sitting in front of the screen, fingers on hotkeys, tagging event after event. The ethogram was settled in review meetings first; then I would code two segments, a colleague would independently code two more, we would compute an inter-rater agreement coefficient, and if it came out too low, back to revising the ethogram. An afternoon of that work is now what a script finishes in seconds.

Over that decade I came to accept a two-sided fact. Manual coding has parts that machines cannot replace. Faced with an ambiguous movement, a human asks about context: is the participant hesitating, talking to a colleague, or stuck on a device? When something happens that the ethogram never anticipated, a human notes it, extends the rules afterward, and sometimes traces the problem back to a flaw in the study design. Judgment, root-cause reasoning, and situational understanding form the last line of defense for coding quality. But the other side of the same coin: manual coding cannot scale. Time cost is only one dimension. Worse is consistency drift—the same coder judges differently in the morning than in the afternoon, differences between coders require training and reconciliation to close, and as sample sizes grow, these costs do not rise linearly but accelerate.

So when I started building BehaviorLens, I did not take the end-to-end route—train one model, video in, coded events out. The reason was not that models are not strong enough. End to end compresses all judgment into a black box: which step went wrong, where errors started accumulating, at what granularity to intervene—none of it can be answered. And those intermediate checkpoints are precisely where the value of coding work lives.

The structure I landed on has three passes. The first pass is a lightweight scan that quickly sweeps the video for what might have happened and marks candidate event segments. It is cheap, and misses are tolerated, because later passes get another look. The second pass runs selective deep analysis on the candidate segments only, with heavier models and finer observational dimensions, confirming or rejecting each candidate. The third pass performs semantic fusion: confirmed fragments go back onto the timeline, overlaps are resolved, similar events merge, and a traceable coding record is generated. Each pass's output can be inspected on its own; when something goes wrong, you roll back only the failing layer instead of rerunning the whole pipeline. Human judgment keeps its place too—ambiguous segments can be flagged for manual review, and the review findings feed back into the coding rules.

The architecture carries one explicit design goal: compress a coding task from roughly nine hours to somewhere around twenty minutes. To be clear, this is an architectural target, not a validated result; verification is still underway. But even if the final number lands above twenty minutes, a change of this magnitude is enough to reshape how the work is organized.

What changes is the researcher's center of gravity, not the job itself. As the mechanics—tagging, cross-checking, computing agreement—shift heavily into automation, what remains is designing the ethogram, auditing the automated coder's edge cases, and exercising judgment in ambiguous situations. Those were always the highest-value parts of manual coding; they were simply buried under repetition. Automation does not eliminate the role. It pushes the role from the operating layer back to the judgment layer.
