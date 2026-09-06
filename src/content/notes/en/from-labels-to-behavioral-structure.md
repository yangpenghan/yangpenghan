---
title: "After recognition: moving from labels to behavioral structure"
description: "Identical action counts can describe different processes. Choosing observation units, Markov chains, hidden states, and longer sequences around the question being asked."
publishDate: 2026-09-06
locale: en
category: behavioral-intelligence
categoryLabel: Behavior, measurement & interpretation
readingMinutes: 6
featured: false
relatedWork: behaviorlens
---

Two people each consult instructions twice, attempt an operation twice, ask for help once, and complete a task. One follows “read, attempt, read, attempt, help, complete.” The other follows “help, read, read, attempt, attempt, complete.”

These are invented sequences. Their counts match, but their processes invite different questions. Did the first person seek help only after repeated attempts? Did early assistance change the second person's subsequent behavior? Counts hide the distinction; sequence alone still does not establish its cause.

That is why I treat annotation as an intermediate layer. After a vision-language model describes actions, we still need to examine how they connect, what repeats, and which explanations require another look at the situation.

## A five-second slice is an observation choice

Fixed windows make recognition tasks easier to distribute and signals easier to align. They also affect what the data treats as an event.

A ten-second action may become two identical labels. A half-second confirmation may disappear inside a five-second summary. The first choice can create many self-transitions; the second can incorrectly connect events that were not adjacent.

Before structural analysis, I would specify the unit: a state sampled every five seconds, or a behavioral event with its own boundaries? Are repeated labels merged? Are speech and manipulation kept on parallel tracks? Is missing footage distinguished from no activity?

I would retain the original windows as inspectable recognition material, then derive event sequences for the research question. Video processing and process analysis can use different units if the conversion remains traceable.

## Why a plain Markov chain still interests me

If the question is what usually follows a request for help, counting transitions between observed categories is already useful. A first-order Markov model uses the current state to summarize the past information needed to predict the next one. Whether transition probabilities are also assumed constant over time is a separate choice. An HMM adds unobserved states and uses observations to infer them. [Jurafsky and Martin, Hidden Markov Models](https://web.stanford.edu/~jurafsky/slp3/A.pdf)

These models answer different questions. A chain can describe transitions between defined behaviors. An HMM can examine a proposed hidden process generating observations. Its inferred states do not automatically become psychological facts such as confusion or engagement.

Suppose ten transitions leave “reading instructions”: six lead to an attempt, three to help, and one to leaving. These demonstration numbers produce a straightforward empirical distribution. They say nothing about a real population.

The denominator still matters. Did the ten transitions come from ten people or mostly one? Someone repeatedly struggling contributes more events. Pooling events describes transitions in those records; it does not necessarily describe what a typical participant will do.

A simple model is valuable partly because these choices remain visible. Complexity does not remove the obligation to explain them.

## Different structures need different questions

Short transitions describe local connections: whether people resume after help or return to instructions after an error.

Repeated patterns describe combinations: where a “read, attempt, return” segment recurs and how long it lasts. Similar local transitions can still form different repeated structures.

Longer sequences describe phases: entering a task, exploring the interface, performing the main operation, and checking completion. A pattern that is reasonable during exploration may deserve attention when repeated near the end.

I would not rank these analyses in advance. If a design team needs to find a recurring return loop, an event timeline and local transitions may provide a clearer starting point than hidden states. A phase model becomes worth considering when the question actually concerns phase changes.

## Order can suggest a mechanism without proving it

Fewer errors after reading instructions might reflect the instructions, or an easier later task. Faster performance after help might include the researcher taking over.

I would preserve task phase, external prompts, and system feedback alongside the sequence. A pattern should lead to competing explanations and a decision about what evidence could separate them.

Evaluation splits should reflect the intended claim. Adjacent clips from the same participant in training and testing may mainly measure familiarity with that person and environment. Claims about new participants or tasks need held-out material corresponding to that intended extension.

Likewise, a striking pattern selected after searching many possibilities should first be treated as a discovery lead and checked on other material. Being noticeable is not the same as being repeatable.

## A small analysis worth implementing

I would begin with a limited set of recordings that can be reviewed event by event. Define events and boundaries, preserve missing and simultaneous activity, and place them on task timelines. Check whether different phases or participants have been mixed.

Then select one question, such as whether people recover independently after returning to instructions. Present raw counts, participant contributions, and illustrative clips before deciding whether a transition model adds anything.

Complexity earns its place when it reveals a useful distinction beyond what is already visible and can be checked with additional data. The output should explain what each connection represents, how much evidence supports it, where it fails, and which design comparison could distinguish explanations.

A more attractive network diagram does not by itself complete the work after recognition. I want the analysis to change the next study or identify a design question worth testing. That depends on [understanding what the labels mean in the first place](../behavior-labels-and-meaning/).
