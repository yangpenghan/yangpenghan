---
title: "Virtual users should be able to fail a reality check"
description: "Moving from plausible responses to testable expectations: defining validation scope, separating calibration data, comparing baselines, and learning from model failure."
publishDate: 2026-08-21
updatedDate: 2026-09-06
locale: en
kind: proposal
category: human-factors
categoryLabel: Simulation, experience & validation
readingMinutes: 6
featured: false
---

A virtual resident says a kitchen has poor circulation. Asked to elaborate, it describes a rushed morning, two people cooking, and awkward access to utensils.

That can inspire discussion. What should the design team change, and what would establish that the change improved use?

I initially considered synthetic responses as a way to inspect questionnaires and scenarios. Following that idea further, I want to ask whether virtual users can make expectations with clear failure conditions and submit them to real behavioral evidence. What follows is a methodological proposal, not a system with completed empirical validation.

## Specify what is being simulated

“Virtual user” can mean an interview respondent, a model reproducing recorded behavior, an actor executing tasks in space, or a tool for comparing design alternatives. Each has a different use.

A rich personality description may not improve action timing. Reproducing movement in an old layout may not predict adaptation to a new one. Calling everything realistic hides the need to evaluate each capability separately.

I would start with a narrow question: under specified tasks, occupancy, dimensions, and movement constraints, is layout A or B more likely to produce mutual obstruction? That question contains geometry, behavioral scheduling, and people's actual responses.

If geometry alone answers the immediate question, a conversational resident is unnecessary. Added behavioral mechanisms become worth building when they change a useful prediction.

## Turn an opinion into an observable expectation

In the hypothetical kitchen, I would unpack poor circulation into events: who is preparing what, which tasks compete for space, who waits or reroutes, and how the order changes.

Then specify the comparison. What remains constant when storage moves? If residents can learn the layout, which tasks reveal that learning? Repeated runs cannot establish adaptation if the model has no mechanism for it.

Expectations can concern locations, sequences, or rankings between designs. An overall experience score is not a necessary starting point. Detecting serious obstruction and predicting a small time saving also demand different precision.

I would record failure conditions before seeing the observations. Otherwise, a prediction of conflict at the entrance and a real pause at a cupboard can both be relabeled spatial inconvenience after the fact. The simulation then becomes difficult to contradict.

## Validation contains several questions

Does the implementation follow its specification? Do the behavioral assumptions adequately represent the task? Does the output agree with real use at the precision the decision needs? Sargent separates conceptual, implementation, data, and operational validity, relating evaluation to intended purpose and acceptable accuracy. [Verification and Validation of Simulation Models, 2003](https://www.informs-sim.org/wsc03papers/006.pdf)

For me, the practical implication is that collision-free movement checks one constraint. A coherent story checks narrative consistency. Neither independently validates a design comparison.

The model also need not resemble people in every detail. If its purpose is finding possible spatial conflicts, first test whether it identifies worthwhile research questions. Its reported scope must remain equally narrow.

## Keep calibration separate from evaluation

Watching where people pause and changing rules to reproduce those pauses is calibration. It may improve fit to those records. The same records cannot then establish successful prediction.

Where the data permits, I would hold out participants, task combinations, or layouts, depending on the intended extension. Holding out adjacent segments of the same recording provides weak support for claims across households.

Comparison should include simple rules, the existing research process, or researchers' initial judgments. Improving over a random output is not enough to justify a complex system in practice.

I would examine missed problems, false warnings, design rankings, and review costs. A model that flags every location may miss little while providing almost no help with prioritization.

## Locate the discrepancy before choosing a repair

When simulation and observation differ, I would first inspect the layer involved: inaccurate dimensions, an incomplete task script, a human strategy the model disallows, or a narrative that has altered the actual output.

Different failures require different repairs. A measurement error changes the input. Restricted rules may require more behavioral possibilities. Negotiation that changes the task order may require reconsidering the simulation unit.

Sometimes the appropriate response is a narrower use. A system might help generate interview questions while remaining unsuitable for estimating population preferences. That retreat can preserve a useful, limited tool.

## When I would let it influence a design decision

I would want a record of the question, the expectation, the independent evidence, the discrepancies, and the consequences of a mistaken decision.

Early exploration may tolerate more false warnings when the team knows that testing follows. A major layout commitment needs stronger comparisons and error analysis. An unchanged interface does not justify an unchanged level of trust.

My proposed starting point is simulation for exposing questions, comparing hypotheses, and preparing studies, followed by evidence about whether it deserves more responsibility. I cannot claim that it has replaced real users.

The next question is [what changes when experience is studied over a day, a week, or longer](../experience-across-time/). A longer run does not automatically contain longer-term experience.
