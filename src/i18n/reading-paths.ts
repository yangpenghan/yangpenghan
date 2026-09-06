import type { Locale } from './ui';

interface ReadingPath {
	id: string;
	title: Record<Locale, string>;
	description: Record<Locale, string>;
	slugs: readonly string[];
}

export const readingPaths: readonly ReadingPath[] = [
	{
		id: 'understanding-behavior',
		title: { zh: '从动作到理解', en: 'From actions to understanding' },
		description: {
			zh: '先问标签留下什么，再看行为怎样组织，最后检查不同证据怎样支持解释。',
			en: 'Examine what labels retain, how events form a process, and what different evidence can support.',
		},
		slugs: [
			'behavior-labels-and-meaning',
			'from-labels-to-behavioral-structure',
			'multimodal-evidence-and-inference',
			'why-three-pass-not-end-to-end',
		],
	},
	{
		id: 'testing-simulation',
		title: { zh: '从模拟到现实检验', en: 'From simulation to reality checks' },
		description: {
			zh: '模拟先提出能被推翻的预期，再展开时间与任务，回到设计过程中的验证。',
			en: 'Make testable expectations, examine tasks across time, and connect validation to development.',
		},
		slugs: [
			'synthetic-users-from-panel-to-agents',
			'experience-across-time',
			'usability-is-an-engineering-process',
		],
	},
	{
		id: 'organizing-ai-work',
		title: { zh: '从一次执行到持续工作', en: 'From one execution to sustained work' },
		description: {
			zh: '工作怎样变成可执行任务，人的负担有没有减少，方法与知识又怎样留下来。',
			en: 'Define executable tasks, account for human effort, and preserve methods and knowledge for reuse.',
		},
		slugs: [
			'when-work-becomes-programmable',
			'automation-and-human-burden',
			'from-research-to-reusable-skills',
			'knowledge-engineering-is-not-a-build',
		],
	},
	{
		id: 'examining-judgment',
		title: { zh: '从结论回到成立条件', en: 'From conclusions to their conditions' },
		description: {
			zh: '检查题目对谁成立、规则由谁改变，再把技术选择放回真实交付条件。',
			en: 'Ask whom a comparison describes, who can change the rules, and what makes delivery feasible.',
		},
		slugs: [
			'every-problem-is-technical',
			'ordinary-people-and-comparison',
			'decisions-behind-systems',
			'engineering-for-delivery',
		],
	},
];

/** Continue a curated argument, wrapping to earlier essays at the end of a path. */
export function getRelatedNoteSlugs(slug: string): string[] {
	const path = readingPaths.find((item) => item.slugs.includes(slug));
	if (!path) return [];
	const index = path.slugs.indexOf(slug);
	return [...path.slugs.slice(index + 1), ...path.slugs.slice(0, index)];
}
