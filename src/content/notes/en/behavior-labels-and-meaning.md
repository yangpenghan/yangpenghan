---
title: "What survives when we turn behavior into labels?"
description: "An action can be recognized correctly and interpreted incorrectly. What coding schemes preserve, what they exclude, and why behavioral analysis needs a route back to context."
publishDate: 2026-09-06
locale: en
category: behavioral-intelligence
categoryLabel: Behavior, measurement & interpretation
readingMinutes: 6
featured: true
relatedWork: behaviorlens
---

Someone reaches across a table. We might label the movement “reaching,” or interpret it as taking an object, asking for help, or stopping someone. A glass on the table, another person nearby, and an error a moment earlier could all change the interpretation.

This is a hypothetical scene, but the difficulty is practical: **recognizing an action correctly does not establish that we have asked the right research question.**

I am interested in automated behavioral recognition. I also want to examine an earlier decision: when we choose the words used to record people, what becomes data, and what never gets a chance to enter?

## A coding scheme shapes what can become a finding

Suppose a study asks whether people can use a device independently. Its coding scheme contains only “click,” “pause,” and “complete.” Requests for help, repeated confirmation, and waiting for someone else must fit somewhere inside those categories.

The eventual result might be that the participant completed the task. But did they understand it, or did another person guide every step? If the source of essential assistance was never recorded, precise statistics will struggle to recover it.

Coding is purposeful compression. We need compression to compare many sessions. The rules should nevertheless be constrained by the research question and open to inspection.

I would test a scheme with boundary examples. Do visually similar actions need different categories because they serve different functions? Do different movements accomplish the same function? If the answer depends on an experienced coder silently filling in the rules, the scheme remains incomplete.

Three errors deserve separate treatment: recognition records an action incorrectly; definition fails to distinguish something the study needs; interpretation assigns meaning beyond the evidence. Better recognition directly addresses only the first.

## What the symbol grounding problem helps me examine

Harnad asks how formal symbols can acquire meaning that does not depend entirely on an external interpreter, connecting the issue to nonsymbolic perceptual representations. That cognitive modeling problem is distinct from the validity of a behavioral coding scheme. [The Symbol Grounding Problem, 1990](https://arxiv.org/abs/cs/9906002)

The connection I find useful is a question: as a label travels through a system, does its relationship to the situation remain inspectable?

“Hesitation” can move from a coding sheet into a database, into a model prompt, and finally into “the user lacks confidence.” Every step can satisfy its format, while the original evidence remains a single pause. The wording gains authority without gaining observations.

Keeping the video does not solve meaning either. Camera position, occlusion, and the recorded time span constrain it. What we can preserve is a route for checking and disputing the interpretation, reducing the authority acquired by an untested word.

## What a record should let us recover

If I built a system around this concern, I would retain several kinds of information. This is a methodological proposal, not a validated product specification.

First, the observable event: its location in the recording, its boundaries, the objects involved, and what the camera actually shows. Next, the task context: the current step, instructions, and preceding or following responses. Then the coding judgment: the selected category, the rule version, and competing interpretations.

A record might say that someone remained on a confirmation page and looked between the amount and the button. “Checking consequences” is one interpretation; “unable to find the next action” is another. Subsequent behavior, a participant question, or a comparison with altered feedback might help distinguish them.

Uncertainty also needs a reason. An obscured movement, an ambiguous intention, and a category that cannot accommodate the event require different responses. Combining them into one low confidence score conceals that distinction.

## Agreement does not establish usefulness

Two coders may agree perfectly that every pause counts as hesitation. That establishes their consistent application of a rule. It does not independently establish that pauses express hesitation, or that reducing pauses is a good design objective.

I would separate reproducible coding from useful distinctions. Can different people or models apply the scheme consistently? Do its distinctions help separate understanding, waiting, and assistance in the task we care about?

Some disagreements should be resolved, such as unclear event boundaries. Others deserve investigation because one category may contain two different mechanisms. Forcing agreement too early can remove an interesting research clue.

## More context is not always better

Every extra field adds collection and review work. Irrelevant background can also encourage more elaborate stories.

My test is whether the information could distinguish explanations that lead to different recommendations. If it only makes the report more vivid, it has lower priority.

A simple count of picking up objects may require only a clear action definition. A question about repeated picking up and putting down may require much more. The necessary detail changes with the judgment being made.

## Automation could help us question the categories

An obvious use of recognition is faster execution of human rules. Another possible use is locating events repeatedly assigned to “other,” frequently corrected, or interpreted inconsistently across contexts. Those events invite researchers to inspect the scheme itself.

This remains a research idea. An apparent new pattern could reflect lighting, camera position, or model bias. It first identifies where to look; it does not automatically discover a psychological mechanism.

In [the three-pass design for BehaviorLens](../why-three-pass-not-end-to-end/), I focus on reviewing intermediate results. The argument here extends that review to the rules themselves. A behavioral system should compress reality while helping us notice what the compression removed.

The next question is [how those labels become meaningful behavioral structures](../from-labels-to-behavioral-structure/).
