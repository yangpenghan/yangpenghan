---
title: "What if the first pass misses an event?"
description: "A tradeoff in the BehaviorLens prototype: intermediate steps aid review, but later passes over candidates cannot recover omitted events."
publishDate: 2026-08-21
updatedDate: 2026-09-05
locale: en
category: behavioral-intelligence
categoryLabel: Behavioral intelligence
readingMinutes: 2
featured: false
relatedWork: behaviorlens
---

An action in behavioral coding can have several explanations: hesitation, talking to someone nearby, or waiting for a device. A coding scheme does not remove the need for context.

For BehaviorLens, I separated candidate scanning, detailed candidate analysis, and assembly against the coding scheme. I wanted each step to remain inspectable.

## Separation reveals another problem

If the first pass misses an event and later passes only examine candidates, they cannot find it. Three passes do not make the workflow reliable by themselves.

Validation must inspect both generated labels and omitted parts of the original video. It needs measures of missed and false events, coding agreement, and total human review time.

## Where the work stands

The concept, architecture, and prototype preparation are complete. Twenty-minute processing remains a design target; speed and quality on real research data are unvalidated.

I chose separate passes to preserve places to locate and correct errors. Whether that is better than alternatives requires comparison. Explaining the choice does not establish that it works.
