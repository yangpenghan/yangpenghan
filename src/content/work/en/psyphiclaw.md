---
locale: en
title: "PsyPhiClaw: an open workflow for multimodal behavioral analysis"
description: A public proof of concept connecting facial expression, gaze, EEG, physiology, fNIRS, and observational coding in a traceable AI workflow.
publishDate: 2026-03-31
updatedDate: 2026-08-12
status: prototype
year: '2026 (prototype public, validation paused)'
order: 3
kind: system
featured: true
discipline: Agentic AI · Open source
outcome: Published 18 behavioral-analysis modules; the validation phase is currently paused, and reliability testing on real research data will come first once it resumes.
role: Initiator, product and system design, core module development
externalUrl: https://github.com/psyphiclaw/PsyPhiClaw
sourceUrl: https://github.com/psyphiclaw/openclaw
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
- at the AI insight layer, guardrail rules flag uncorrected multiple comparisons, causal wording, and conclusions that lack a data source, and output is released only after human confirmation;
- produce traceable figures, structured results, and reports instead of only a natural-language answer.

The natural-language interface is an entry point. The actual product is the repeatable, inspectable chain behind it.

## Architectural decision: why separate modules

PsyPhiClaw is decomposed into 18 behavioral-analysis modules rather than a single monolithic system. The choice follows one engineering judgment: the module boundary is the inspection boundary.

Each module owns one describable piece of work—parsing one data format, performing one alignment step, running one class of analysis, producing one version of a report—and can be tested and replaced independently. Modules connect through standardized data interfaces: inputs and outputs follow explicit structural contracts, and intermediate results can be written to disk and examined. When a conclusion goes wrong, the failure can be located in a specific step, and reviewing that one module is enough—no need to debug the entire pipeline.

This architecture matches the project's design philosophy: decompose expert work into bounded, reviewable units of collaboration. The cost of modularity is more assembly work; the benefit is that every automated judgment keeps a place where it can be examined.

## Public status

The public implementation contains 18 `psyphiclaw-*` modules spanning ingestion, analysis, fusion, visualization, reporting, batch processing, and research retrieval. The project uses the MIT License and publishes its roadmap. The main PsyPhiClaw repository holds the project description; the module code lives in the public OpenClaw fork. Both were last updated in March 2026 and can be verified independently.

Those numbers demonstrate construction effort, not scientific validity. The validation phase is currently paused; once it resumes, the first priority is benchmarking against real research data: format compatibility, consistency, error recovery, statistical correctness, human-review cost, and differences from established analysis workflows.

## What stayed

The project reinforced a conviction: decomposing expert work into bounded, reviewable units of collaboration is more reliable than asking one model to do everything. The goal of automation is to make every judgment easier to trace; speed is a side benefit.

## Public note

PsyPhiClaw is a proof of concept, not a clinical, regulatory, or production-validated analysis product. The public site does not present roadmap items as completed capabilities.
