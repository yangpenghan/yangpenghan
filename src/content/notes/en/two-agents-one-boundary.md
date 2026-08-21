---
title: "Two agents, one boundary"
description: "How a work agent and a personal agent divide labor: shared resources, separate memories, and why a read-only boundary matters more than any technology choice."
publishDate: 2026-08-21
locale: en
category: agentic-ai
categoryLabel: Agentic AI
readingMinutes: 5
featured: false
---

I run two agents side by side. One handles work scenarios and does deep analysis: searching knowledge bases, running long tasks, drafting documents. The other handles personal scenarios and does daily monitoring: watching market quotes, scanning news, and assembling everything into a daily brief.

The split started for a mundane reason: the two kinds of tasks pollute memory in opposite directions. A monitoring agent produces enormous amounts of fragmentary information every day—quotes, headlines, provisional judgments. Mixed into one memory, that noise dilutes the work agent's context. Conversely, long chains of professional reasoning have no business crowding into a daily brief. So the two agents keep completely separate memories, each maintaining its own context.

The resources, though, are shared. Knowledge bases, command-line tools, data files—both sides can use them. Only memory is separated, not the infrastructure.

## The read-only boundary

What actually took me time to figure out was where to draw permissions.

My rule: the personal agent has **read-only** access to critical data. It can read, analyze, and alert. But if a conclusion needs to be written back—modifying records, updating the conclusions store—it has no authority. That must go through the work agent.

The asymmetry comes from how differently the two work. The monitoring agent's strength is frequency, speed, and low cost; the price is shallow judgment and short context. It is built for spotting leads, not settling conclusions. The work agent is slow, but every run carries full context and the complete tool chain, so it can verify and trace. Let the fast one only see and report; let the slow one confirm and write. When something goes wrong, the blast radius stays contained.

This is an old question in organizational design: within a team, who holds write access and who holds read access is usually determined not by who is more powerful, but by whose judgment process is more rigorous. Agent teams are not fundamentally different.

## The boundary is negotiable

I have not hard-coded this boundary into the architecture; it works more like a working agreement. There are data classes where the personal agent's writes are harmless—its own market summaries, for instance. Others must stay tight, such as records that feed into work conclusions. Where the line sits depends on the cost of repairing the data if it gets corrupted.

Generalizing the lesson: when designing a multi-agent system, instead of agonizing over frameworks and communication protocols first, write the responsibility table first—what each agent owns, which data it may write, which it may only read, and who arbitrates conflicts. Once those answers exist, the technology choices mostly reduce to implementation details.
