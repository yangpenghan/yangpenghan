---
title: "Technical sophistication still needs a delivery argument"
description: "From demonstration to sustained use: comparing coverage, validation effort, maintenance, and exit options. Both simple and complex approaches need to justify their costs."
publishDate: 2026-09-06
locale: en
category: solution-engineering
categoryLabel: Reframing problems & judgment
readingMinutes: 6
featured: false
relatedWork: ai-agent-system
---

Imagine two behavioral-analysis approaches that both work on a demonstration video. One requires continued model adaptation. The other combines existing recognition tools, explicit rules, and human review. The first exposes more possibilities; the second makes each step easier to explain.

The demonstration cannot determine the better choice. The recipient, duration of use, acceptable errors, and person responsible for repairs all affect the answer.

My interest in stable delivery does not rule out new techniques. I want to distinguish research interest, operational feasibility, and a worthwhile investment, then examine where they overlap.

## Define the unit of delivery

A working script, an analysis report, and a process someone can still use next month are different deliverables.

If the immediate need is a research judgment, a general platform may add unrelated work. If the same task recurs weekly, a report alone may leave the expensive part unresolved.

I would describe delivery as a process: who supplies which inputs, who receives what and when, how incomplete material is handled, and which decision the result supports. This creates a shared basis for discussing models and frameworks.

It can also reveal apparent disagreements. A researcher exploring a new representation and a manager seeking a reviewable conclusion by a deadline may be evaluating different things. Exploration and present delivery can have separate success conditions.

## Follow cost across the full period of use

Calls and hosting are visible expenses. Data preparation, review, updates, recovery, and handover are easier to omit.

My bookkeeping framework is **construction + data preparation + operation + review + recovery + migration and exit**. It is a decision aid, not an estimated cost model.

Each term needs a time horizon and an owner. An approach may save analyst time while creating weekly engineering work. An easier demonstration may increase verification during final reporting. Measuring only the visible saving can misclassify transferred work as eliminated work.

Unknowns should remain ranges with stated assumptions. What happens if volume doubles, source quality falls, or the main maintainer leaves? A small trial should reduce the uncertainty most likely to change the choice.

## Give candidates the same difficult cases

I would retain a simple comparison: the manual process, a script, or explicit rules. It need not be another AI system.

Candidates should face common acceptance criteria and the same normal, incomplete, ambiguous, and out-of-scope inputs. Each approach's strongest demonstration material is not a fair comparison.

For behavioral coding, examine missed events, boundaries, and review time alongside label quality. For research briefings, examine source tracing, important omissions, and the guidance required each week alongside prose quality.

Model Cards offers a useful reference for documenting intended uses, evaluation conditions, and limitations. Documentation itself does not establish suitability for this project. [Model Cards for Model Reporting](https://arxiv.org/abs/1810.03993)

The result I want is a specific account of what the approach improves over current practice under stated conditions.

## Stability must not become a reason to stop experimenting

Mature approaches may leave structural gaps. Repeatedly expensive review or rules that cannot distinguish important events also have a cost.

A new method deserves a trial when it could change that bottleneck. Limit the materials, responsibility, and trial period; run it alongside the existing process; examine whether its improvement is sufficient.

If it fails, identify the assumption: inadequate input, insufficient capability, unreliable integration, or no corresponding user need. An informative failure can reduce uncertainty about the next investment. A successful-looking demonstration may conceal all of these distinctions.

I would ask complex approaches to justify their added burden and simple approaches to explain what they leave unresolved. Neither earns suitability from its complexity alone.

## Include a way to leave

If a component becomes unavailable, can work continue with reduced efficiency? Can inputs and outputs be exported? Can another colleague take over? Which checks must be repeated when a model changes?

These questions need not produce a large general architecture. A minimum could be original inputs, standard outputs, version records, and an executable manual fallback.

For an exploratory direction, reversibility is valuable. It lets a team try a technique without binding its entire working method to one choice.

## Make “not yet” a conditional judgment

An approach that is not worth pursuing now may become worthwhile. A useful explanation identifies missing data, a cost that must change, or an effect that needs demonstrating first.

I would leave three things behind: why this choice fits current conditions, what evidence could change it, and when or under which conditions to revisit it.

This connects to [every problem is a technical problem](../every-problem-is-technical/): making constraints explicit creates opportunities to reorganize them. It also leads to [automation's human burden](../automation-and-human-burden/). After technical delivery, we still need to examine whether the user's work improved.
