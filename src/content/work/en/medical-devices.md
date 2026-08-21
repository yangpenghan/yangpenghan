---
locale: en
title: Turning medical-device usability into an engineering process
description: A traceable, reusable IEC 62366 workflow spanning use-risk analysis, formative evaluation, and summative validation.
publishDate: 2022-03-01
updatedDate: 2026-08-12
status: operating
year: 2019—present
order: 4
kind: system
featured: true
discipline: Medtech · Human factors
outcome: Turned isolated testing requests into a development-lifecycle capability used across 25+ medical-device companies.
role: Practice creation, method design, solution design, and key project delivery
tags:
  - IEC 62366
  - HE75
  - Use risk
  - Formative evaluation
  - Summative evaluation
confidentiality: Device details, test tasks, use errors, and participant data are confidential. This page covers only the public method and aggregate outcomes.
---

## The problem

Medical-device usability is ultimately about whether a use error can harm a patient, an operator, or somebody nearby. Early on, many teams in China treated usability as one test before registration: finish the product, recruit participants, and ask them to complete a list of tasks.

That puts the most valuable work at the latest possible moment. The real challenge is to keep user-interface risk traceable from requirements and design through validation and documentation—and to give engineering, clinical, regulatory, and design teams a shared body of evidence.

## My role

I built the practice and delivery system from the ground up. That meant translating IEC 62366, ANSI/AAMI HE75, and risk-management requirements into steps product teams could execute; designing studies, tasks, and recording systems; coordinating manufacturers, testing bodies, and research teams; and converting project experience into reusable templates and training. China's regulatory requirements were also part of my day-to-day work: I am familiar with the NMPA guidance on usability engineering for registration review and with YY/T 1474 (the Chinese adoption of IEC 62366, whose counterparts abroad include the EU MDR's usability-engineering expectations and FDA human-factors guidance), and I gave a talk on usability engineering at a medical-device regulatory science and regulations forum in 2025.

## The approach

The work begins with context of use, not participant recruitment:

1. Define intended users, environments, operating principles, and critical tasks.
2. Connect user-interface characteristics to hazards, hazardous situations, and potential harm.
3. Run formative evaluations while the design can still change, observing errors, near misses, confusion, and recovery paths.
4. Preserve evidence through synchronized multi-view video and structured behavioral coding.
5. Conduct summative evaluation after design freeze and connect the results back to the usability-engineering file.

Eye tracking, facial expression, and physiological measures are used only when they answer a specific question. Instrumentation cannot replace task design, risk judgment, or root-cause analysis.

## An interface is more than a screen

The object of evaluation includes physical operation, software feedback, labels, instructions, and training. Any part can create an opportunity for error during perception, judgment, or action. A study therefore needs more than success and failure. Records should distinguish assistance, use error, close call, operational difficulty, user comment, and researcher observation.

In one anonymized formative evaluation, I brought software prototypes, hardware interaction, and instructional material into the same use scenarios. A pilot first checked whether the equipment, task language, duration, or environment would create a study artifact. During execution, video timestamps connected action, think-aloud data, and retrospective review. Recurring problems and root causes then entered another design round instead of being compressed into a usability score.

## Why formative work may deliberately withhold training

The purpose of formative evaluation is to expose assumptions, not to prove that a product already passes. Some early rounds deliberately ask people unfamiliar with the product to act without full training, placing additional pressure on interface intelligibility and error prevention.

In another high-fidelity design, training itself became an interface variable. One group received training in a representative format with a normal forgetting interval; another did not, revealing how much guidance the interface could carry alone.

This should not be generalized to summative validation, where training must represent actual use conditions. The point is stating clearly what the current study evaluates: the interface, the training, or the complete use system they create together.

## A report cannot stop at pass rates

Task failure does not automatically prove a defective interface, and task success does not automatically prove risk has been controlled. A root cause may involve the interface, training, the study setup, domain knowledge, or actual work practice. A formal report has to explain where an error occurred, why, which risk it relates to, and whether the control has evidential support.

This is what traceability means in practice. It is not completing a stack of documents before submission. It is preserving the reason connecting a requirement, risk, design change, and validation at the moment each decision occurs.

## The outcome

The capability has been used across ventilators, monitoring systems, surgical devices, IVD products, and other categories, serving more than 25 medical-device companies and related institutions. Multiple plans, pilots, formal sessions, root-cause analyses, and design feedback rounds formed an iterative loop. The more important result is not the number of tests: usability moved from a pre-submission obligation to an engineering process teams could use earlier in development.

I have also organized standards, cases, and delivery knowledge into a structured internal knowledge base with more than 6,000 indexed passages, used to speed up retrieval and proposal preparation. The source standards and client materials remain private.

The capability eventually crystallized into Noldus's usability-engineering software platform: it covers the full IEC 62366 workflow, including use-scenario definition and user-profile management, use-risk analysis (automatically linking UI characteristics, hazards, and harm), formative and summative evaluation task management, AI-assisted document generation, and one-click export of regulatory submission documents. Since 2019 the platform has served as the technology support partner for China's first medical-device usability testing platform (Jiangsu Institute of Medical Device Testing), extending across provincial testing institutes in Liaoning, Beijing, Tianjin, Shandong, Jiangsu, and elsewhere, and serving leading manufacturers such as United Imaging, MicroPort, and Sinocare, as well as notified bodies including TUV and SGS. My role in this was contributing to product feature definition and methodology input.

## Work samples (redacted)

The samples below are redacted examples with a real structure and fictional data, shown to illustrate the shape of the deliverables.

### Sample 1: observation–interpretation–decision record

This is the recording format I have used since the financial-app study, keeping what was observed, how we interpret it, and what we decided as three separate statements:

| Observation (reproducible event) | Interpretation (research judgment) | Decision (product / next round) |
| --- | --- | --- |
| 9-second dwell on the transfer confirmation page, scrolling the page before returning to edit the amount | The participant is checking consequences—a reasonable trade-off, not a comprehension failure | Keep the confirmation-page structure; emphasize only the amount and fee fields |
| 3 of 8 participants backed out to the messaging app while entering a verification code | The code's expiry notice is placed where people do not expect to check | Move the expiry hint next to the input field; verify in the next round |
| One participant gave up the task after repeatedly switching between two devices | The cross-device flow sets no expectation that state carries over | Enter the requirement backlog, flagged as a cross-device consistency issue |
| When searching a fund code returned no results, the participant fell back to a fuzzy name search | The code input tolerates too little variation | Suggest first-letter name suggestions; watch search completion rate |

### Sample 2: critical task–use error–risk control mapping

In medical-device work, this kind of table connects the use-risk analysis with evaluation findings (tasks from a ventilator-class product):

| Critical task | Observed use error / close call | Risk control | Follow-up verification |
| --- | --- | --- | --- |
| Setting tidal volume | Parameters not re-confirmed after switching between pressure and volume modes | Forced confirmation after mode switch, highlighting the active parameters | Re-check in the next formative round |
| Replacing the circuit | Ventilation started without checking cuff pressure (close call, corrected by the assisting nurse) | Circuit-replacement checklist printed inside the side cover | Set as a mandatory task in summative evaluation |
| Clearing an alarm | High-priority alarm silenced and never restored | Mute state shown persistently on the main screen with a countdown | Compare against real workflow |
| Activating backup power | Switch found only with a prompt, despite training | Tactile marker and color coding added to the switch | Retest with an untrained group |

## What stayed

In safety-critical products, the endpoint of user research is an evidence chain strong enough to carry accountability; finding problems is only an intermediate step. I carried the same principle into AI-assisted automation: it can speed up organization and checking, but the source of each judgment and the person who confirmed it must remain.

## Public note

This case uses aggregate method and volume information only. Client identities and project details are not published; client references and project evidence are available under NDA. Devices, use errors, study protocols, source recordings, and regulatory files are likewise not published.
