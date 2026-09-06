---
locale: en
title: "BehaviorLens: keeping review points in automated video coding"
description: "Video coding takes time and requires context. I designed a three-pass prototype to explore where researchers should review automated work."
publishDate: 2026-05-01
updatedDate: 2026-09-05
status: prototype
statusText: "Prototype · Performance validation pending"
year: 2026—present
order: 10
kind: system
featured: false
discipline: Agentic AI · Behavior analysis
outcome: "Concept, architecture, and frontend prototype prepared. The 20-minute processing goal and coding accuracy remain unvalidated."
role: Initiator, product architecture, core method definition
tags:
  - behavior-coding
  - multi-pass-architecture
  - video-analysis
  - LLM
  - human-ai-workflow
confidentiality: Internal product-concept stage, not yet publicly released. This page describes only the method and architectural direction.
---

## Reframing the problem

**If we only ask:** How can behavioral coding be faster?

**The more useful question:** Which candidate segments can be extracted automatically, and which contextual judgments need human review? Separate the jobs, then test whether the prototype reduces the work.

## Which work I wanted to reduce

Researchers repeatedly watch video, mark events against a coding scheme, and check agreement. Ambiguous actions need context, so faster labeling alone is not enough.

I initiated BehaviorLens and worked on the concept, architecture, core method, and prompts to separate repetitive scanning from research judgment.

## The three passes

The first pass proposes candidate segments. The second examines those segments in detail. The third uses the coding scheme to assemble descriptions and a timeline. Intermediate outputs allow researchers to inspect and correct each step.

There is a cost: later passes looking only at candidates cannot recover events missed by the first pass. Checks against the original video and missed-event evaluation must be part of validation.

## Current state

The work so far covers strategic analysis, architecture, a frontend prototype, and prompts. Validation with real research data is not complete.

Twenty minutes is a processing target. Video duration, the coding task, and the manual comparison need defining before speed and quality can be tested together. There is no measured efficiency gain to report yet.

The next checks are missed events, coding agreement, and review time. Those results are needed to judge whether the three-pass design helps.
