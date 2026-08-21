---
title: "From panel libraries to agent libraries: where synthetic users stop"
description: "A consumer-experience research concept built on the synthetic survey respondent (SSR) method: how far OCEAN personality models take you, and which conclusions may always need real humans."
publishDate: 2026-08-21
locale: en
category: agentic-ai
categoryLabel: Agentic AI
readingMinutes: 7
featured: false
---

In July 2026 I drafted an AI simulation concept for a consumer-experience study for a real-estate client. Rather than settling for "have an LLM generate some answers," the concept followed an existing academic line: the Colgate paper on synthetic survey respondents (SSR). That paper showed that LLM-generated, personified respondents can approximate the distributions of real samples on certain survey dimensions. My concept tried to answer a more engineering question: placed in the early phase of a real commercial study, what can this method carry, and where does it break?

## The paradigm shift

The traditional infrastructure for survey research is the panel library: recruit, screen with questionnaires, sample against quotas, schedule, execute. The synthetic-user concept swaps that infrastructure for an agent test library—each persona is an agent configured along OCEAN dimensions (openness, conscientiousness, extraversion, agreeableness, neuroticism), plus background and consumption history. To test a concept, you no longer sample and recruit; you run a batch of agents through it.

At the core of my concept sits a synthetic personality engine: given the structure of a target population, it generates a set of personality instances with a plausible distribution across OCEAN dimensions, each carrying preferences and constraints consistent with its profile. During concept iteration, you can run the entire library repeatedly and compare how different personality profiles react.

## The limits of the paper

The SSR method has clear boundaries. Personality questionnaires can be reproduced fairly well by synthetic samples, because a questionnaire is itself a self-report language task—exactly what LLMs are best at. But real consumer decisions are not purely language tasks: budget constraints, household negotiation, channel friction, the spatial experience of walking through a property—none of these live inside a personality model's description space. A highly extraverted synthetic respondent will "speak" more socially, but that does not mean it will actually visit three developments on a Saturday.

So I see the breakthrough space in combining two things. First, task design: instead of having synthetic users fill out questionnaires, put them into structured task situations—given a budget, a household structure, and an information environment, observe their decision paths. Second, behavioral measurement: import methods from human factors. Record not only the agent's final choice but its intermediate steps, hesitations, information-seeking order, and points of abandonment. This is my home turf in behavioral research, and it is usually the missing layer when pure language-model teams build SSR systems.

## Changing the cost structure

With that positioning, the role of synthetic users becomes clear. They cannot replace real behavioral measurement—an agent has no budget pressure, no spouse to argue with, no commuting cost. But they can change the cost structure of early-stage iteration. Concept screening, wording comparisons, stress-testing task flows—work that used to require recruiting real users every round can first go through many rounds on the synthetic library, saving real people for the final rounds of validation.

As for which conclusions can be permanently delegated to synthetic users and which must, on principle, return to real populations—I do not have a firm answer. My intuition is that everything that depends on "saying" (preference statements, reason narratives) will be absorbed by synthetic methods first, while everything that depends on "doing," where doing carries real cost, may need real humans for a long time. Where exactly that line sits is probably a question only more project data can answer.
