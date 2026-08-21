---
locale: en
title: "A personal AI work system, in daily operation"
description: A production personal AI infrastructure built from scratch on an agent runtime, 62 structured skills, two knowledge bases, and multi-agent division of labor.
publishDate: 2026-03-01
status: operating
year: 2026—present
order: 1
kind: system
featured: true
discipline: Agentic AI · Knowledge engineering
outcome: Built a production-grade personal AI work system from scratch and ran it daily; knowledge bases cover 360+ documents and day-to-day operations are heavily automated.
role: System designer, skill architect, prompt engineer
tags:
  - agent-runtime
  - multi-agent
  - RAG
  - knowledge-engineering
  - skill-system
confidentiality: Internal system; runtime implementation details are not public. This page describes only the capability architecture and design philosophy.
---

## What this is

Since the start of 2026 I have been building and daily running my own AI work system: a self-built agent runtime (OpenClaw), with Claude Code as a coding sub-agent, connected to multiple AI models. It is not a demo or a side project — it is the infrastructure that handles my actual work every day: email monitoring, calendar syncing, heartbeat checks, and information archiving all run on it.

The homepage says I use Agentic AI to amplify expert workflows. This system is that sentence made concrete.

## Capability architecture

Four parts make up the system:

- **Skills.** 62 structured capability modules, each encapsulating a reusable class of task, from product retrieval to automated inspection.
- **Knowledge bases.** A Noldus product knowledge base (146 documents + ChromaDB vector search) and a medical-device usability knowledge base (217 documents covering IEC 62366, ANSI/AAMI HE75, and NMPA guidance). RAG at both layers keeps answers attached to their sources.
- **Message routing.** Cross-platform intake from WeCom, QQ, Discord, and Gmail, unified into one processing flow.
- **Memory.** Continuity across sessions — the system remembers which decisions were made last week and which lessons have already been captured.

## Multi-agent division of labor

There is more than one agent in the system. A work agent handles business matters; a personal agent manages personal information and daily affairs. One boundary is deliberately designed: the personal agent has read-only access to critical data, and modifications must go through the work agent. This is less a technical constraint than a way of making "who may change what" an explicit, auditable rule.

## Relation to the vertical products

PsyPhiClaw and BehaviorLens are vertical expressions of the same idea — focused workflows for behavioral analysis. This system is the horizontal expression: infrastructure for daily work itself. All three rest on the same conviction: getting AI to carry expert work depends less on model strength than on whether capabilities are structured, boundaries are clear, and judgments are traceable.

## One observation

After a year of operation, the most valuable thing turns out not to be any single feature but the fact that the system remembers. The more the knowledge bases, skills, and memory accumulate, the higher its starting point on each new task. The time spent building the system is slowly coming back as time saved every day.
