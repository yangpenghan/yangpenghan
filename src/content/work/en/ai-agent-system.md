---
locale: en
title: "My AI work system: connecting repeated lookup and admin tasks"
description: "I use OpenClaw, Claude Code, and existing retrieval tools for email information, calendars, reference lookup, and filing, with defined write permissions."
publishDate: 2026-03-01
updatedDate: 2026-09-05
status: operating
year: 2026—present
order: 8
kind: system
featured: false
discipline: Agentic AI · Knowledge engineering
outcome: "Used in my daily work, with task instructions, separate knowledge collections, and agent roles. No public efficiency benchmark is available."
role: "Tool integration, workflow design, knowledge preparation, and maintenance"
tags:
  - agent-runtime
  - multi-agent
  - RAG
  - knowledge-engineering
  - skill-system
confidentiality: Internal system; runtime implementation details are not public. This page describes only the capability architecture and design philosophy.
---

## Reframing the problem

**If we only ask:** Which other AI tools could I connect?

**The more useful question:** Which recurring tasks can have clear inputs, steps, and checks? Define the work first, then assemble tools and permissions.

## Starting with my own recurring work

Product lookup, locating standards passages, organizing email information, following calendars, and filing all recur in my work. In 2026, I began connecting them in a personal AI system.

My contribution is tool selection and configuration, task instructions, knowledge preparation, debugging, and daily use. The runtime is based on the existing OpenClaw project, with Claude Code helping implementation. My work is in the combination and workflow design.

## Breaking down the steps

I maintain retrieval with Python scripts and ChromaDB. Product and usability questions go to separate reference collections. Precise terminology starts with keyword lookup; less specific questions can use semantic retrieval. Repeated tasks have reusable instructions for inputs, steps, and checks.

Work and personal agents keep separate context. Changes to key data pass through the designated work process, while the personal agent has read-only access to those records. These rules need to be reflected in tools and permissions and checked as the system changes.

## Current state

I use the system for daily information handling, retrieval, and filing. It is not a general product release, and I have no public time-saving or error-rate comparison.

Using it myself lets me inspect the approach directly. A step that repeatedly needs rework is a reason to revise an instruction, tool, or responsibility. Adding features alone does not demonstrate progress.
