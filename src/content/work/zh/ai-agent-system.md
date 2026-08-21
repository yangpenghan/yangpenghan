---
locale: zh
title: 运行中的个人 AI 工作系统
description: 基于 Agent 运行时、62 个结构化 Skill、双知识库与多 agent 分工，从零构建并日常运行的个人 AI 基础设施。
publishDate: 2026-03-01
status: operating
year: 2026—现在
order: 1
kind: system
featured: true
discipline: Agentic AI · 知识工程
outcome: 从零构建生产级个人 AI 工作系统并持续日常运行，知识库覆盖 360+ 文档，日常运营高度自动化。
role: 系统设计者、Skill 架构师、提示词工程师
tags:
  - agent-runtime
  - multi-agent
  - RAG
  - knowledge-engineering
  - skill-system
confidentiality: 内部系统，不公开运行时实现细节。本页只描述能力架构与设计理念。
---

## 这是什么

从 2026 年起，我一直在构建并日常运行一套自己的 AI 工作系统：一个自建的 Agent 运行时（OpenClaw），加上 Claude Code 作为编码子 agent，接多个 AI 模型。它不是一次演示或一个 side project，而是每天处理我实际工作的基础设施——邮件监控、日历同步、心跳巡检、信息归档都在上面跑。

首页写"用 Agentic AI 放大专家工作流"，这套系统就是那句话的实物。

## 能力架构

系统由四部分组成：

- **Skill 体系**。62 个结构化能力模块，每个封装一类可复用的任务，从产品检索到自动化巡检。
- **知识库**。Noldus 全线产品知识库（146 文档 + ChromaDB 向量搜索），以及医疗器械可用性知识库（217 文档，覆盖 IEC 62366、ANSI/AAMI HE75 与 NMPA 指导原则）。两层 RAG 让回答带着来源。
- **消息路由**。企微、QQ、Discord、Gmail 的跨平台接入，信息统一进入处理流。
- **记忆系统**。跨会话的连续性——系统记得上周做了什么决定、哪些教训已经沉淀。

## 多 agent 分工

系统里不只有一个 agent。工作 agent 处理业务相关的事项，私人 agent 管理个人信息与日常事务，各有分工。边界上有一个刻意的设计：私人 agent 对关键数据只读，修改必须经过工作 agent。这不是技术限制，而是把"谁能动什么"变成显式规则，出错时可查。

## 与垂直产品的关系

PsyPhiClaw 和 BehaviorLens 是这套理念的垂直展开——针对行为分析的特定工作流。这个系统是水平展开：日常工作本身的基础设施。三者共享同一个判断：让 AI 承担专业工作，关键不在模型多强，而在能力是否被结构化、边界是否清楚、判断是否可追溯。

## 一点体会

运行一年下来，我发现最有价值的不是任何单一功能，而是系统"记得"。知识库、Skill 和记忆积累得越多，它处理新任务时的起步点越高。构建这套系统花的时间，正在以每天省下的时间慢慢回来。
