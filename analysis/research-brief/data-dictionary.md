# 数据字典

CSV 必须保留以下列名和顺序，不得增加额外列。每次尝试占一行，并按实际发生顺序追加；重试使用新的 `trial_id`，但保留原 `pair_id`。不同主题不能事后拼成同一条件的重试。

| 字段 | 类型与允许值 | 记录规则 |
|---|---|---|
| `trial_id` | 非空文本，唯一 | 每次尝试的新编号，例如 `P01-H-01` |
| `pair_id` | 非空文本 | 预先登记的配对编号，例如 `P01` |
| `condition` | `human` / `agent` | 人工或 Agent 辅助 |
| `task_id` | 非空文本 | 任务卡编号；同一条件重试不得换题 |
| `started_at` | ISO 8601 文本 | 带时区的开始时间 |
| `setup_human_minutes` | 非负数或空白 | 本次专属设置；共享设置另记归属，不能每次重复全额分摊 |
| `research_human_minutes` | 非负数或空白 | 人实际检索、阅读和摘录时间 |
| `supervision_human_minutes` | 非负数或空白 | 人必须持续注意 Agent 的时间 |
| `correction_human_minutes` | 非负数或空白 | 事实核验、质量验收、改写和重跑所用的人时 |
| `recovery_human_minutes` | 非负数或空白 | 失败恢复、撤销和补救所用的人时 |
| `elapsed_minutes` | 非负数或空白 | 从开始到结束的经过时间；不与人工阶段相加 |
| `interruptions_count` | 非负整数或空白 | 人被叫回处理的次数；空白表示未知，`0` 表示确认没有中断 |
| `accepted` | `true` / `false` / `unknown` | 四项验收均通过才为 `true` |
| `quality_notes` | 文本 | 逐项写事实、引用、覆盖、格式的结果与问题 |
| `model` | 文本 | 模型和可影响结果的设置；人工条件填 `none` |
| `skills_revision` | 文本 | skill 名称及固定版本/提交；人工条件填 `none` |
| `sources_cutoff` | 日期文本 | 本次检索截止日期 |
| `notes` | 文本 | 中断原因、异常、共享设置分摊、偏离方案等 |

五项人工阶段互斥：同一分钟只能进入一个阶段。空白表示未知，`0` 表示确认该阶段没有发生。任何一项缺失时，`total_human_minutes` 都是缺失，不按 0 处理。`elapsed_minutes` 可能包含无人等待，也可能与人工时间重叠，因此只单独展示。
