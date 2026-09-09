// Values transcribed without smoothing from the 2023 report's native chart caches.
// Anonymous A/B labels refer to the two separate records on report slide 10.
// This is report-level data, not raw participant signals or a new analysis.
import type { Copy } from './model';
export interface ReportDataset {
	id: string;
	phase: 'before' | 'during' | 'after';
	kind: 'line' | 'bar';
	label: Copy;
	title: Copy;
	unit: Copy;
	maximum: number;
	categories: readonly string[];
	series: readonly [readonly number[], readonly number[]];
	slide: number;
	chart: number;
	precision: number;
}
export const reportDatasets = [
	{
		id: 'eye-closure',
		phase: 'before',
		kind: 'line',
		label: ['闭眼强度', 'Eye-closure intensity'],
		title: ['闭眼强度随时间的变化', 'Eye closure over time'],
		unit: ['报告指标值', 'Reported index'],
		maximum: 1.0,
		categories: ['0-5', '5-10', '10-15', '15-20', '20-25', '25-30'],
		series: [
			[0.25737418, 0.34089556, 0.37252343000000004, 0.36621363999999995, 0.3545615, 0.3599228],
			[0.0612969, 0.1191654, 0.1937273, 0.27750985, 0.37598950000000003, 0.3631188],
		],
		slide: 7,
		chart: 1,
		precision: 3,
	},
	{
		id: 'alpha-beta',
		phase: 'before',
		kind: 'line',
		label: ['脑电 α/β', 'EEG α/β'],
		title: ['睡前脑电 α/β 比值', 'Pre-sleep EEG α/β ratio'],
		unit: ['α/β 比值', 'α/β ratio'],
		maximum: 3.0,
		categories: ['0-5', '5-10', '10-15', '15-20', '20-25', '25-30'],
		series: [
			[
				1.3182884530074264, 1.8045932065783117, 2.422778556696516, 2.408682555516605, 1.3751788371685798,
				2.141022293684252,
			],
			[
				1.5540440242545461, 1.3682642427003608, 1.4141195792750607, 1.3829884585856846, 1.724215110365822,
				1.4942831910146106,
			],
		],
		slide: 8,
		chart: 4,
		precision: 3,
	},
	{
		id: 'theta-alpha-a',
		phase: 'during',
		kind: 'line',
		label: ['记录 A', 'Record A'],
		title: ['入睡过程中的 θ/α 比值 · 记录 A', 'Sleep-onset θ/α ratio · Record A'],
		unit: ['θ/α 比值', 'θ/α ratio'],
		maximum: 3.0,
		categories: ['0-5', '5-10', '10-15', '15-20', '20-25', '25-30'],
		series: [
			[
				0.5290826233132526, 2.042884053570653, 2.695914405256738, 1.883411775319396, 2.074555230217249,
				0.7877826254068282,
			],
			[
				0.8159997492487268, 1.512901898065467, 2.33120723420217, 2.3338572174010346, 1.9297130288667663,
				1.5242270325737084,
			],
		],
		slide: 10,
		chart: 8,
		precision: 3,
	},
	{
		id: 'theta-alpha-b',
		phase: 'during',
		kind: 'line',
		label: ['记录 B', 'Record B'],
		title: ['入睡过程中的 θ/α 比值 · 记录 B', 'Sleep-onset θ/α ratio · Record B'],
		unit: ['θ/α 比值', 'θ/α ratio'],
		maximum: 3.0,
		categories: ['0-5', '5-10', '10-15', '15-20', '20-25', '25-30'],
		series: [
			[
				0.28961434709657563, 0.30956458969010037, 1.002515464916386, 0.46179005045480387, 0.9852543187411821,
				1.1708596131131337,
			],
			[
				1.6555350679505565, 0.8029128962553849, 0.9929047352289916, 0.597064887532327, 0.3448526217483539,
				0.3843439853544687,
			],
		],
		slide: 10,
		chart: 9,
		precision: 3,
	},
	{
		id: 'fixations',
		phase: 'after',
		kind: 'bar',
		label: ['注视分布', 'Fixations'],
		title: ['醒后任务中的注视点数量', 'Fixations in the post-sleep task'],
		unit: ['次数 · 报告汇总值', 'Count · reported summary'],
		maximum: 80,
		categories: ['Total', 'Target', 'Non-target'],
		series: [
			[68.0, 25.5, 42.5],
			[55.5, 11.0, 44.5],
		],
		slide: 11,
		chart: 10,
		precision: 1,
	},
	{
		id: 'target-clicks',
		phase: 'after',
		kind: 'bar',
		label: ['目标点击', 'Target clicks'],
		title: ['醒后任务中的目标点击次数', 'Target clicks after waking'],
		unit: ['次数 · 报告汇总值', 'Count · reported summary'],
		maximum: 10,
		categories: ['Target clicks'],
		series: [[8.5], [6.0]],
		slide: 11,
		chart: 12,
		precision: 1,
	},
] as const satisfies readonly ReportDataset[];
