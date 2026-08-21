---
locale: en
title: "BehaviorLens: AI-driven automated behavior coding"
description: A three-pass architecture designed to replace 9 hours of manual coding, combining structured scanning, multi-model deep analysis, and semantic fusion into a traceable workflow.
publishDate: 2026-05-01
status: prototype
year: 2026—present
order: 2
kind: system
featured: true
discipline: Agentic AI · Behavior analysis
outcome: Completed zero-to-one product design (strategy, architecture, prototype, prompt engineering); the three-pass architecture targets 20 minutes of automated processing in place of 9 hours of manual coding.
role: Initiator, product architecture, core method definition
tags:
  - behavior-coding
  - multi-pass-architecture
  - video-analysis
  - LLM
  - human-ai-workflow
confidentiality: Internal product-concept stage, not yet publicly released. This page describes only the method and architectural direction.
---

## The problem

Anyone who has done structured behavior coding in Observer knows the pattern: a few hours of interaction video take longer to code than to record. The questions researchers actually want to answer sit at the analysis layer, yet enormous amounts of time go into frame-by-frame labeling. Parent-child interaction research is a typical case — rich interaction detail, dense coding schemes, and manual coding that is both the quality bottleneck and the time bottleneck.

## The three-pass architecture

BehaviorLens (project codename SMT for Human) splits coding into three passes:

1. **Structured scanning.** A lightweight model slices through the video and answers a cheap question: where is something happening?
2. **Selective deep analysis.** Only the segments flagged in pass one are processed in parallel by multiple models, extracting posture, movement, and facial expression separately.
3. **Semantic fusion.** An LLM receives the extracted results and, together with the coding scheme, generates behavior descriptions and codes.

The design goal is to compress what takes 9 hours of manual coding into 20 minutes of automated processing. Note that this is an architectural design target; it has not yet been validated on real research data.

## Why traceability

An obvious question is why not build an end-to-end model: video in, codes out. Because behavioral research cannot accept black-box output. A code that enters a paper or a conclusion must be defensible: which step produced this label, which signals it rests on, where a human can review it.

The three passes separate the judgments into layers. A scanning error (a missed segment) and a fusion error (a misworded code) have different characters and different remedies. Each boundary between passes is a natural intervention point — a researcher can inspect segment selection before deep analysis, and check coding rationale after fusion. An end-to-end model offers none of this; it offers an answer.

## Strategic framing

The product sits inside a four-layer paradigm: Evidence → Feedback → Signal → Pattern. My call is to start at the Evidence layer — reliably automate "what happened" before reaching for higher layers. This matches my background in behavioral research: without a trustworthy evidence layer, everything above is built on sand.

The division of labor with PsyPhiClaw falls along the same line: PsyPhiClaw is a workflow for multimodal signal processing, while BehaviorLens is a vertical product for behavior-coding automation. One handles how signals are aligned and fused; the other handles how codes come out fast and checkably.

## Current status

Strategic analysis, architecture design, product concept, theoretical alignment, a front-end prototype, prompt engineering, and the reporting outline are all complete. What remains is validation on real research data — the next step, and the prerequisite for turning 20 minutes from a design target into a measured result.
