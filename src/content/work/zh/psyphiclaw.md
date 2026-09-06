---
locale: zh
title: "PsyPhiClaw：让多设备数据处理能分步检查"
description: "把文件导入、时间对齐、分析与报告拆成模块，尝试减少研究者在不同工具之间反复整理数据的工作。"
publishDate: 2026-03-31
updatedDate: 2026-09-05
status: prototype
year: 2026（原型公开，验证暂停推进）
order: 9
kind: system
featured: false
discipline: Agentic AI · 开源
outcome: "公开 18 个行为分析模块；验证暂停，真实研究数据上的可靠性仍待检验。"
role: 发起人、产品与系统设计、核心模块构建
externalUrl: https://github.com/psyphiclaw/PsyPhiClaw
sourceUrl: https://github.com/psyphiclaw/openclaw
tags:
  - Agentic AI
  - Multimodal data
  - Python
  - LLM guardrails
  - Open source
confidentiality: 这是公开原型，不代表已经完成生产验证。页面明确区分已实现模块与待验证能力。
---

## 重构的问题

**如果只问：** 能否让模型直接解释多模态数据？

**进一步追问：** 导入、对齐和分析能否分别检查，再交给 AI 协助组织？先搭出可复核的处理步骤；真实数据上的有效性仍待验证。

## 我想处理的麻烦

一项研究使用多种设备时，文件格式、时间基准和清洗步骤各不相同。研究者需要先转换和对齐数据，才能开始分析。

我发起 PsyPhiClaw，负责产品边界、工作流设计与核心模块构建，尝试把这些重复步骤接起来。

## 为什么拆成模块

我把输入、规范化、分析、可视化和报告分开，让中间结果可以检查。数据或结论有疑问时，先定位到具体步骤，再决定重做哪一段。

项目包含眼动、EEG、生理、表情、fNIRS 与观察编码等输入方向。语言模型用于组织工作与辅助解释；数据处理和计算需要明确的工具与检查。

## 已完成与未完成

公开代码包含 18 个行为分析模块。项目说明位于 PsyPhiClaw 主仓库，模块源码位于 OpenClaw fork，可通过本页链接查看。

验证目前暂停。模块数量说明构建范围，不能证明结果准确。恢复后需要用真实数据检查格式兼容、时间对齐、统计结果、错误发现和人工复核成本，并与既有分析流程对照。

这是公开原型，尚不能据此承诺可直接用于正式研究结论。
