---
title: "Every problem is a technical problem"
description: "By technical, I mean examining goals, constraints, and relationships, then reorganizing what is available into an approach we can act on and test. How this shapes my research, use of AI, and collaboration."
publishDate: 2026-09-05
updatedDate: 2026-09-06
locale: en
category: solution-engineering
categoryLabel: Core argument
readingMinutes: 8
featured: true
relatedWork: human-robot-interaction
---

Every problem is a technical problem.

This is a starting point for how I work. When something is difficult, I ask what it consists of, which conditions keep it that way, and whether reorganizing those conditions could change what happens.

I use *technical* broadly. Writing code belongs here, as do designing an experiment, asking an answerable question, arranging how information moves, and making cooperation possible. Their shared purpose is to **turn a desired change into something we can do, observe, and adjust.**

## A question can already contain its preferred answer

“We need AI.” “The team needs more training.” “This feature should be smarter.” These sound like requirements, but each has already selected an approach.

Take a hypothetical request for training. Which task is going wrong? Do people lack the skill, or do they know what to do but lack timely information, authority, or feedback?

Those situations can look similar and require different interventions. A knowledge gap may call for practice. Late information calls for examining a handoff. Conflicting responsibilities call for deciding who can act and who bears the consequences. Training alone might leave people understanding the explanation again and still unable to use it.

I begin by separating the goal from the proposed solution. “We need training” becomes: “Who needs to accomplish what, under which conditions, and what currently prevents it?”

That question gives us choices.

## Take the problem apart, then reconnect the relationships

Dividing a problem into ten headings is easy. Finding which change would affect another condition takes more work.

I look at the desired state, what actually happens, the constraints that are hard to change, and the places where we can intervene. Then I follow a real sequence: when information appears, who decides, and what feedback follows an action.

Suppose a user pauses on a screen. Label it “lack of skill,” and instruction may seem the obvious response. But the person might be carefully checking the consequences of a transaction. Shortening that pause would not necessarily serve the original goal. We need to understand what it means first.

A systematic analysis needs to preserve these relationships. Looking only at individual ability can hide the environment. Improving the speed of one step might leave more rework further along.

I ask: **Would a different scope of observation reveal an option we have missed?**

## A concrete example: studying an interaction before the robot is finished

In [service-robot research](../../work/human-robot-interaction/), I separated an encounter into what happens before it starts, how it begins, the task itself, and the ending. “Make the robot more natural” became questions we could inspect: do people know they can interact, receive a response when they start, and recognize when the encounter is over?

Some of those questions could be tested before all the features existed. I used a person behind the scenes to simulate key responses, then observed how participants understood the interaction.

The change was in the sequence of validation. We temporarily separated implementing the feature from checking whether people could understand the experience. The second could happen first. Simulation has limits: it cannot establish that a robot can perform a task autonomously. It can help us decide whether the interaction deserves further work.

The available toolkit became larger: a person could stand in for an unfinished part of the prototype.

## The size of a useful response may be surprisingly small

In [packaging research](../../work/multimodal-packaging/), I used EEG, eye tracking, and natural behavior observation. One recommendation I can share was to add instructions for using a fruit cup.

Getting from those instruments to an instruction meant returning the signals to the activity: what people saw, understood, handled, opened, and consumed. Each method helped inspect part of that sequence. Together, they needed to inform a design decision.

This reminds me to judge an intervention by whether it addresses the obstacle. It does not need to demonstrate how many sophisticated tools I used. Whether that recommendation improved subsequent use would require a separate check; proposing it is not evidence that the effect occurred.

## Give each tool a specific job

Eye tracking and observation help me examine behavior. Simulations let me test an idea earlier. Python and retrieval tools handle repeated data work. OpenClaw and coding assistants help connect tasks in my daily work.

A new problem calls for a fresh selection. Sometimes the information exists and needs reorganizing. Sometimes an observation is missing, and more code cannot supply it. Sometimes the process is already clear enough for automation to become useful.

With AI, I first ask what the input is, who will use the output, and how errors will be detected. If these remain vague, delegating the task may simply produce more material that someone must interpret again.

My [toolbox and working approach](../../method/#toolbox) describe concrete uses of these methods. The tools will change; this order of choosing them can remain.

## What about emotions and conflicting values?

I think a technical perspective can help, provided we identify accurately what needs addressing.

Two people may disagree because they have different information, or because they bear different risks. The first situation may benefit from evidence. The second requires discussing interests, responsibilities, and acceptable conditions. More information alone may not resolve it.

Technical work can make those differences explicit, support a discussion, and compare the costs of alternatives. Deciding what is worth pursuing and who should bear a cost requires a value choice by the people involved. Treating someone's disagreement as merely a communication failure may misdefine the problem from the outset.

Likewise, with loss or something irreversible, we first need to understand what help a person wants. Companionship, expression, and changes to daily arrangements can become concrete actions. An optimization target cannot define someone else's feelings for them.

## The claim needs to answer for its limits

“Every problem is a technical problem” expresses my commitment to looking for an approach. It does not establish that every goal can be achieved under every set of conditions. Contradictory requirements, unavailable resources, and irreversible facts deserve serious recognition.

When conditions are insufficient, I want to make that explicit. What is possible if they remain fixed? Which constraint would need to change for another option to exist? Would the people affected accept its cost? If something is infeasible, we should explain why and which premises that conclusion depends on.

There is also a trap in reframing: the new question can be easier because it no longer addresses the original concern. Replacing “reduce errors” with “run more training,” then claiming success from attendance figures, would be such a substitution.

So I check my own reframing. Does it still serve the original goal? What result would make me admit I was wrong? Do the people affected also think things have improved?

Independent thinking needs both moves: questioning the given problem and allowing evidence to overturn my answer.

This is the working habit I want potential collaborators to understand. I examine a difficulty, look for conditions we can reorganize, and use available tools for a meaningful attempt. Then I return to what actually happened and decide what to do next.

## Taking the argument further

This essay establishes a starting point. Specific problems still need their own arguments: [what behavioral labels retain](../behavior-labels-and-meaning/), [which observations could contradict a virtual user](../synthetic-users-from-panel-to-agents/), and [whether faster execution reduces people's burden](../automation-and-human-burden/).

A comparison must also explain [which starting conditions it describes](../ordinary-people-and-comparison/), while a proposal needs to examine [the decisions behind the rules](../decisions-behind-systems/). These questions share a habit of examination but need different evidence. I want to work through each before deciding how they connect.
