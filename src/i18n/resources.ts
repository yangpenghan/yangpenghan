import type { Locale } from './ui';

type Localized = Record<Locale, string>;
interface Resource {
	title: Localized;
	description: Localized;
	status: 'template' | 'example';
	csv?: boolean;
}

export const resources = {
	'evidence-trace': {
		title: { zh: '观察与问题追溯表', en: 'Observation and issue traceability' },
		description: {
			zh: '把动作、解释、出处与待做决定分开记录。',
			en: 'Record actions, interpretations, sources, and pending decisions separately.',
		},
		status: 'template',
	},
	'study-preparation': {
		title: { zh: '研究准备与决策连接表', en: 'Study preparation and decisions' },
		description: {
			zh: '明确本轮假设、任务、记录方式与发现后的责任人。',
			en: 'Define assumptions, tasks, recording methods, and who acts on findings.',
		},
		status: 'template',
	},
	'interaction-prototype': {
		title: { zh: 'Wizard-of-Oz 交互试验简报', en: 'Wizard-of-Oz interaction brief' },
		description: {
			zh: '对照前台体验、后台响应与模拟条件的限制。',
			en: 'Connect the frontstage experience, operator responses, and simulation limits.',
		},
		status: 'template',
	},
	'agent-workload': {
		title: { zh: 'Agent 人工负担评估表', en: 'Agent human-workload evaluation' },
		description: {
			zh: '比较配置、监督、纠错与恢复成本；附空白 CSV。',
			en: 'Compare setup, supervision, correction, and recovery; includes a blank CSV.',
		},
		status: 'template',
		csv: true,
	},
	'coding-review': {
		title: { zh: '行为编码与复核记录', en: 'Behavioral coding and review' },
		description: {
			zh: '保留情境、分歧与漏检，区分动作标签和解释。',
			en: 'Preserve context, disagreement, and misses; distinguish labels from interpretation.',
		},
		status: 'template',
	},
	'research-brief-skill': {
		title: { zh: '有出处的研究简报 Skill', en: 'Evidence-linked research brief Skill' },
		description: {
			zh: '最小指令示例：输入、证据记录、异常路径与人工验收。',
			en: 'A minimal instruction example with inputs, evidence records, exceptions, and human review.',
		},
		status: 'example',
	},
} satisfies Record<string, Resource>;

export type ResourceId = keyof typeof resources;
export const workResources: Record<string, ResourceId[]> = {
	'financial-behavior-model': ['evidence-trace'],
	'medical-devices': ['study-preparation'],
	'human-robot-interaction': ['interaction-prototype'],
	'ai-agent-system': ['agent-workload', 'research-brief-skill'],
	psyphiclaw: ['research-brief-skill'],
	behaviorlens: ['coding-review'],
	'organizational-growth': ['research-brief-skill'],
	'automotive-hmi': ['study-preparation'],
	'multimodal-packaging': ['evidence-trace'],
	'cross-cultural-discovery': ['evidence-trace'],
};
export const noteResources: Record<string, ResourceId[]> = {
	'issue-lists-expire': ['evidence-trace'],
	'usability-is-an-engineering-process': ['study-preparation'],
	'automation-and-human-burden': ['agent-workload'],
	'from-research-to-reusable-skills': ['research-brief-skill'],
	'behavior-labels-and-meaning': ['coding-review'],
	'why-three-pass-not-end-to-end': ['coding-review'],
};

export const noteKindLabels = {
	essay: { zh: '观点与分析', en: 'Analysis' },
	practice: { zh: '实践反思', en: 'Practice reflection' },
	proposal: { zh: '待验证的方法', en: 'Method to be tested' },
} satisfies Record<string, Localized>;
