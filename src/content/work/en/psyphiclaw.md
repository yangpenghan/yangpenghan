---
locale: en
title: "PsyPhiClaw: an open workflow for multimodal behavioral analysis"
description: A public proof of concept connecting facial expression, gaze, EEG, physiology, fNIRS, and observational coding in a traceable AI workflow.
publishDate: 2026-03-31
updatedDate: 2026-08-12
status: prototype
year: 2026—building
order: 4
kind: system
featured: true
discipline: Agentic AI · Open source
outcome: Published 18 behavioral-analysis modules; the next phase is reliability validation on real research data.
role: Initiator, product and system design, core module development
externalUrl: https://github.com/psyphiclaw/PsyPhiClaw
tags:
  - Agentic AI
  - Multimodal data
  - Python
  - LLM guardrails
  - Open source
confidentiality: This is a public prototype, not a production-validated product. The page distinguishes implemented modules from capabilities still awaiting validation.
---

## The problem

The slowest part of multimodal behavioral research often comes before the final statistics. Every instrument arrives with a different format, time base, and cleaning logic. Researchers spend substantial effort converting, aligning, and checking data before they can address the real question.

Language models can explain text, but they do not automatically know whether gaze data was cleaned correctly, an EEG event was aligned, or a correlation has been overstated as causation. Placing a chat model directly on top of the files can generate unreliable conclusions faster.

## My role

I initiated PsyPhiClaw and designed its product boundary and layered workflow. The project comes from more than a decade of behavioral-data work: which steps are suitable for automation, which judgments require domain guardrails, and which results must preserve provenance and human confirmation.

## The approach

PsyPhiClaw decomposes the work into inspectable modules:

- ingest facial expression, gaze, EEG, physiology, fNIRS, Observer coding, and LSL streams;
- normalize sources and align time using triggers, markers, or explicit rules;
- run single-modality analysis and cross-modal association;
- check data integrity, statistical significance, effect size, multiple comparisons, causal wording, and hallucination risk at the AI insight layer;
- produce traceable figures, structured results, and reports instead of only a natural-language answer.

The natural-language interface is an entry point. The actual product is the repeatable, inspectable chain behind it.

## The current outcome

The public implementation currently contains 18 `psyphiclaw-*` modules spanning ingestion, analysis, fusion, visualization, reporting, batch processing, and research retrieval. The project uses the MIT License and publishes its roadmap. The main PsyPhiClaw repository holds the product description; active modules live in the public OpenClaw fork, so both the intent and implementation can be inspected directly.

Those numbers demonstrate construction effort, not scientific validity. The next phase must benchmark real research data: format compatibility, consistency, error recovery, statistical correctness, human-review cost, and differences from established analysis workflows.

## What I learned

The value of agentic AI is not asking one model to do everything. It is decomposing expert work into bounded, reviewable units of collaboration. High-quality automation should not merely make work faster; it should make every judgment easier to trace.

## Public note

PsyPhiClaw is a proof of concept, not a clinical, regulatory, or production-validated analysis product. The public site does not present roadmap items as completed capabilities.
