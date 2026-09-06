---
locale: en
title: "PsyPhiClaw: making multi-device analysis inspectable step by step"
description: "I split import, time alignment, analysis, and reporting into modules to explore reducing the preparation needed between research tools."
publishDate: 2026-03-31
updatedDate: 2026-09-05
status: prototype
statusText: "Prototype · End-to-end validation pending"
year: '2026 (prototype public, validation paused)'
order: 9
kind: system
featured: false
discipline: Agentic AI · Open source
outcome: "Published 18 behavioral-analysis modules. Validation is paused; reliability on real research data remains unverified."
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

## Reframing the problem

**If we only ask:** Could a model interpret multimodal data directly?

**The more useful question:** Can import, alignment, and analysis each be checked before AI helps organize the work? Build inspectable steps first; validity on real data remains to be tested.

## The difficulty I wanted to address

Research using several devices produces different formats, clocks, and cleaning requirements. Conversion and alignment come before the actual analysis.

I initiated PsyPhiClaw and worked on its scope, workflow, and core modules to connect some of these repeated steps.

## Why separate modules

Import, normalization, analysis, visualization, and reporting have inspectable intermediate outputs. When a result is questionable, the researcher can locate the step and decide what needs repeating.

Input areas include gaze, EEG, physiology, facial expression, fNIRS, and observational coding. Language models help organize work and explanations; processing and calculation need explicit tools and checks.

## Built and still unverified

The public code includes 18 behavioral-analysis modules. The main PsyPhiClaw repository contains the overview; module code is in the OpenClaw fork linked on this page.

Validation is paused. Module count describes scope, not accuracy. Further work needs real-data comparisons for formats, timing, statistics, error detection, and review cost against established analysis workflows.

This is a public prototype. It does not yet support a claim that it can be relied on for formal research conclusions.
