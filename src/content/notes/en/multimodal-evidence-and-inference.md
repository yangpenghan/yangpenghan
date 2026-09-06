---
title: "Posture, expression, and speech: separating observation from inference"
description: "Another signal is not automatically independent evidence. How multimodal analysis can preserve competing interpretations, disagreement, and missing information."
publishDate: 2026-09-06
locale: en
category: behavioral-intelligence
categoryLabel: Behavior, measurement & interpretation
readingMinutes: 6
featured: false
relatedWork: multimodal-packaging
---

Imagine a device trial. A participant finishes, smiles, says “fine,” and pushes the device away. A model reports a positive expression, affirmative language, and a closing action. The report could easily combine them into “the user is satisfied.”

They might instead be responding politely, confirming completion, or ending an interaction they do not want to continue. This hypothetical scene has no established answer. It exposes the question I care about: how can multimodal analysis bring us closer to the process, rather than increase confidence in an unchecked story?

## Give information different jobs

In my thinking about automated recognition, I tend to begin with posture as a description of action, then use expression and speech to help interpret it. That does not make posture inference-free, or expression a direct reading of emotion.

A more useful distinction separates observable manifestations, interpretation of their task function, and claims about internal states. Hand movement and spoken words belong to the first layer. Confirmation or requesting help belongs to the second. Satisfaction or anxiety requires another step.

Each step needs a reason. Barrett and colleagues examine the reliability, specificity, and contextual difficulties of inferring emotion from facial movements. Their review gives no basis for treating a particular movement as sufficient evidence of one emotion. [Emotional Expressions Reconsidered, 2019](https://doi.org/10.1177/1529100619832930)

Similarly, recognizing the word “fine” supports the claim that it was said. What the speaker accepted depends on the conversation. Turning a model's output label directly into a research variable can skip this distinction.

## Three signals may share one source of error

If expression, speech, and posture all belong to a polite farewell, they may be shaped by the same interaction. Their agreement demonstrates compatible manifestations of that farewell before it establishes independent support for product satisfaction.

Several conclusions may also come from one multimodal model response. Displaying them in three separate cards does not create three separate measurements.

I would inspect each item's source, processing, and potentially shared error. If one modality supplied labels for another, their later agreement cannot serve as independent confirmation.

Fusion can still help. It should be clear what it adds: visibility through occlusion, better event boundaries, a distinction between explanations, or merely another expression of the same information.

## Disagreement can be the useful finding

A participant says “I understand” and then repeatedly fails the operation. Averaging language and behavior into one understanding score can erase the interesting question.

Perhaps they understand the goal but cannot find the action. Perhaps they memorized a demonstration but cannot transfer it. Perhaps the system failed to respond. The next step is to separate explanations, not declare one modality universally more truthful.

I would retain what happened, what each explanation can account for, and what evidence could change the judgment. Recovery after clearer feedback might help examine feedback problems; asking about the intended next step might help examine conceptual understanding.

These are investigation proposals. A mismatch does not reveal a hidden motive by itself. It identifies a place where evidence is incomplete.

## Missing information needs its own status

Failure to capture a smile is different from observing the absence of a smile. An empty transcript could mean silence or recording failure. If both become zero in a table, later analysis cannot recover the distinction.

Timing matters too. A frown after an error message can be aligned to an earlier interface element if clocks differ. The visualization may look precise while connecting the response to the wrong event.

Before interpretation, I would check availability, signal quality, synchronization, and external prompts. If an important source is unavailable, narrow the conclusion. Other modalities should not silently manufacture certainty in its place.

## When another measurement is worth adding

My criterion is whether it can change the next decision. If video already shows repeated attempts at the same entrance, modifying that entrance and testing again may be more useful than adding equipment.

A new signal has a clearer purpose when two explanations imply different design changes and it could distinguish them. Its value still needs to justify collection, synchronization, cleaning, coding, and review.

In [the packaging study](../../work/multimodal-packaging/), EEG, eye tracking, and observation addressed different parts of use. One publicly describable recommendation was clearer fruit-cup instructions. The number of instruments does not establish that the recommendation worked; that requires later validation.

## Produce an explanation people can challenge

For a tool built around this approach, I would show the event and its source segment first, then supporting and limiting evidence. A reviewer should know where to look, what to ask, and which comparison might help.

A percentage can be a model score. Interpreting it as the probability that a judgment is correct requires calibration for the relevant task. Additional decimal places do not supply that evidence.

One comparison worth trying would give researchers either a combined conclusion alone or that conclusion with evidence, conflicts, and missing information. On the same materials, we could examine error detection, review time, and overinterpretation. I have not yet performed that comparison.

I want multimodal systems to improve our account of what we observed and what remains unknown. That connects directly to [the meaning preserved by behavioral labels](../behavior-labels-and-meaning/).
