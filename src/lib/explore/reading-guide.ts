import type { Copy } from './model';
export const readingGuides: Record<string, { question: Copy; meaning: Copy; finding: Copy; boundary: Copy }> =
	{
		'eye-closure': {
			question: ['变化贯穿整个时段吗？', 'Does the difference persist throughout the period?'],
			meaning: [
				'闭眼动作相关指标，不是困倦百分比。点选最初与最后的 5 分钟，比较两种条件。',
				'An eye-closure movement index, not a sleepiness percentage. Compare the first and last five-minute intervals.',
			],
			finding: [
				'0–5 分钟：样品 0.257，对照 0.061；25–30 分钟：样品 0.360，对照 0.363。开始相差较大，最后接近；一个总答案会丢掉时间信息。',
				'At 0–5 min: sample 0.257, control 0.061. At 25–30 min: 0.360 and 0.363. The initially larger difference narrows; a single overall answer loses timing information.',
			],
			boundary: [
				'这是眼部动作记录的差异，不能据此确定起效时间或普遍疗效。',
				'These are differences in eyelid movement records, not established onset-of-effect times or general efficacy.',
			],
		},
		'alpha-beta': {
			question: ['另一条同步记录呈现什么？', 'What does another synchronized record show?'],
			meaning: [
				'脑电 α/β 是报告选取的频段比值；与眼部动作是不同的观察通道。',
				'EEG α/β is a frequency-band ratio selected in the report, a different observation channel from eyelid movements.',
			],
			finding: [
				'点选 10–15 分钟：样品 2.423，对照 1.414。再看完整时段，差异的方向与大小并非处处相同。',
				'At 10–15 min: sample 2.423, control 1.414. Across the complete period, the direction and size of differences vary.',
			],
			boundary: [
				'比值不是通用放松分数，不能单凭它证明产品功效。',
				'The ratio is not a universal relaxation score and does not alone establish efficacy.',
			],
		},
		'theta-alpha-a': {
			question: ['不同人的入睡记录相同吗？', 'Do individuals show the same sleep-onset pattern?'],
			meaning: [
				'这里展示脑电 θ/α 频段比值。握松任务的肌电是另一条记录，不能与本图混同。',
				'This is an EEG θ/α ratio. EMG from the grip task is a separate recording, not what this chart displays.',
			],
			finding: [
				'记录 A 在 5–10 分钟：样品 2.043，对照 1.513。切换记录 B，在同一刻度比较同一时段。',
				'Record A at 5–10 min: sample 2.043, control 1.513. Switch to B to compare the same interval on the same scale.',
			],
			boundary: [
				'A、B 是两人的独立记录，不是两组均值；比值不能直接换算精确睡眠深度或入睡时间。',
				'A and B are separate participant records, not group means. The ratio does not directly give exact sleep depth or sleep-onset time.',
			],
		},
		'theta-alpha-b': {
			question: ['换一个人，比较关系变了吗？', 'Does the comparison change for another person?'],
			meaning: [
				'与记录 A 保持相同的 0–3 刻度，保留样品和普通奶两条完整曲线。',
				'The same 0–3 scale as A preserves both complete sample and regular-milk series.',
			],
			finding: [
				'记录 B 在 5–10 分钟：样品 0.310，对照 0.803。与 A 相比，两种条件的高低关系不同，个体差异不能被合并掉。',
				'Record B at 5–10 min: sample 0.310, control 0.803. Their ordering differs from A; individual differences should remain visible.',
			],
			boundary: [
				'两份曲线不足以支持普遍功效，也不能据此推算提前入睡多少分钟。',
				'Two records cannot establish general efficacy or how many minutes earlier someone fell asleep.',
			],
		},
		'target-clicks': {
			question: ['醒后任务完成了多少？', 'How much of the waking task was completed?'],
			meaning: [
				'原研究为 20 秒视觉搜索：117 个字母中找 10 个目标。此图是报告汇总值，不是网页练习成绩。',
				'The study used a 20-second search: 10 targets among 117 letters. These are report summaries, not your website task results.',
			],
			finding: [
				'目标点击汇总值：样品 8.5，对照 6.0。它补充了主观感受之外的任务完成记录。',
				'Target-click summaries: sample 8.5, control 6.0. They add a record of task completion alongside subjective feelings.',
			],
			boundary: [
				'不把它改称完成时间、正确率或每个人的成绩；完整汇总细节不足，不补算显著性。',
				'These are not completion times, accuracy rates or individual scores. Incomplete aggregation details do not support added significance tests.',
			],
		},
		fixations: {
			question: ['寻找过程中，注视分配在哪里？', 'Where were fixations allocated during the search?'],
			meaning: [
				'眼动记录视线停留的位置；注视与点击是不同记录。全部、目标和非目标区域一同呈现。',
				'Eye tracking records gaze locations; fixations and clicks are distinct. Total, target and non-target categories remain visible.',
			],
			finding: [
				'目标区域注视：样品 25.5，对照 11.0；非目标为 42.5 与 44.5。这补充了任务结果之外的过程信息。',
				'Target fixations: sample 25.5, control 11.0; non-target: 42.5 and 44.5. This adds process information beyond completion.',
			],
			boundary: [
				'注视次数更多不自动代表效率更高；这些是报告汇总值，不与访客点击数比较。',
				'More fixations do not automatically mean higher efficiency. These report summaries are not compared with visitor clicks.',
			],
		},
	};
