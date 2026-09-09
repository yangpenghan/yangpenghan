export const stages = [
	'intro',
	'question',
	'before',
	'during',
	'after',
	'delivery',
	'synthesis',
	'paths',
] as const;
export type Stage = (typeof stages)[number];
export type Language = 'zh' | 'en';
export type Copy = readonly [string, string];
export function translate(copy: Copy, language: Language): string {
	return copy[language === 'zh' ? 0 : 1];
}
export function readStage(hash: string): Stage {
	const candidate = hash.replace(/^#/, '');
	return stages.find((stage) => stage === candidate) ?? 'intro';
}
export function previousStage(stage: Stage): Stage {
	return stages[Math.max(0, stages.indexOf(stage) - 1)];
}
export const phaseNames: Copy[] = [
	['睡前', 'Before sleep'],
	['睡中', 'Falling asleep'],
	['睡后', 'After waking'],
];
export const targetLetters = 'A H R A N K R H A K N R H N K A R H N K A H R K'.split(' ');
export const methods = [
	{
		id: 'facial-expression-analysis',
		label: ['面部表情分析', 'Facial expression analysis'],
		title: ['把面部动作，变成可观察的线索。', 'Make facial movements observable.'],
		short: [
			'把视频中的面部动作变成可比较的记录。在这个故事里，眼部动作帮助我们观察睡前的变化；它不能独自说明一个人内心的感受。',
			'Facial analysis turns movements in video into comparable records. Here, eyelid and eye-closure movements provide clues before sleep; they do not independently reveal someone’s feelings.',
		],
		question: [
			'一个人说自己困了，我们还可以观察什么？',
			'What else can we observe when someone says they feel sleepy?',
		],
		steps: [
			['视频', 'Video'],
			['面部动作', 'Facial movements'],
			['时间记录', 'Records over time'],
		],
		example: [
			'把眼部动作放回睡前的观察时段，与主观感受等记录一起看。我们关心的是哪些变化值得继续解释，而不是给一张脸贴一个情绪标签。',
			'Locate eyelid-related facial movements in the pre-sleep observation period, alongside self-reports. The question is which changes deserve interpretation, rather than assigning an emotion to a face.',
		],
		boundary: [
			'动作识别与情绪解释是不同环节。光照、角度、遮挡和分析条件都需要检查；不能把一个动作直接当作困倦或产品效果的证明。',
			'Detecting movements and interpreting emotions are separate steps. Lighting, angles, occlusion and analysis conditions matter. A movement alone does not establish sleepiness or product efficacy.',
		],
		source: 'https://noldus.com/facereader/facs',
		sourceName: 'Noldus · FACS & FaceReader',
		stage: 'before',
	},
	{
		id: 'eeg',
		label: ['脑电 EEG', 'EEG'],
		title: ['记录变化，再回到问题。', 'Record changes. Return to the question.'],
		short: [
			'脑电记录传感器测到的电压随时间的变化。研究者把记录放回任务与分析条件中解释；一段波形本身不是“助眠有效”的答案。',
			'EEG records voltage changes detected by sensors over time. Interpretation depends on the task and analysis conditions. A waveform alone does not establish a sleep benefit.',
		],
		question: ['怎样在一段过程中，增加另一种观察？', 'How can we add another observation across a process?'],
		steps: [
			['传感器', 'Sensors'],
			['电压记录', 'Voltage records'],
			['条件与解释', 'Context & interpretation'],
		],
		example: [
			'在这个研究故事中，脑电是过程观察的一部分。先明确比较哪个阶段，再讨论信号处理、指标与其他观察是否支持同一种解释。',
			'In this research story, EEG is one source of observations across time. Define the phase first, then consider signal processing, measures and other evidence.',
		],
		boundary: [
			'示意波形不是研究数据。不同指标需要各自的依据；这里不把某个波段比值等同于临床睡眠分期，也不进行健康测评。',
			'Illustrative waveforms are not study data. Each measure needs justification. This story does not equate a frequency ratio with clinical sleep staging or assess health.',
		],
		source: 'https://www.emotiv.com/knowledge-base/emotiv-data-streams',
		sourceName: 'EMOTIV · EEG data streams',
		stage: 'during',
	},
	{
		id: 'eye-tracking',
		label: ['眼动', 'Eye tracking'],
		title: ['看见观看的过程。', 'See the process of looking.'],
		short: [
			'眼动记录视线在哪里停留、怎样移动。在找字母任务中，它帮助观察寻找过程。网页点击不是眼动数据，看向某处也不等于已经理解它。',
			'Eye tracking records where gaze pauses and moves. It helps examine visual search. Website clicks are not gaze data, and looking somewhere does not establish understanding.',
		],
		question: ['完成同一个任务，人是怎样找到目标的？', 'How does someone find the target in a task?'],
		steps: [
			['任务画面', 'Task'],
			['视线记录', 'Gaze records'],
			['寻找过程', 'Search process'],
		],
		example: [
			'在寻找目标字母时，研究者可以将视线位置和任务表现放在一起看。是否反复寻找、停在哪里，是继续提问的线索；解释仍需要任务情境。',
			'In a letter-search task, researchers can examine gaze alongside task performance. Revisits and gaze locations prompt further questions; interpretation still needs context.',
		],
		boundary: [
			'点击只能说明点击的位置，不能代替视线。注视也不能直接证明喜欢、理解或产品效果。设备、校准与任务条件影响记录质量。',
			'Clicks reveal click locations, not gaze. Fixations do not establish preference, understanding or product efficacy. Equipment, calibration and task conditions affect data quality.',
		],
		source: 'https://developer.tobii.com/xr/learn/eye-behavior/eye-movements/',
		sourceName: 'Tobii · Eye movements',
		stage: 'after',
	},
	{
		id: 'behavioral-tasks',
		label: ['行为任务', 'Behavioral tasks'],
		title: ['让一个问题，留下行动的记录。', 'Let a question leave a record of action.'],
		short: [
			'用一段明确的任务，观察人怎样开始、进行和完成。这里的找字母只展示任务记录的方法，不给访客做能力或睡眠评价。',
			'A defined task makes starting, performing and finishing observable. This letter search demonstrates task records, not a test of your ability or sleep.',
		],
		question: ['除了问感受，还能怎样观察实际表现？', 'What can we observe beyond self-reports?'],
		steps: [
			['明确任务', 'Define a task'],
			['记录行动', 'Record actions'],
			['回到目标', 'Return to the goal'],
		],
		example: [
			'故事中的握球和找字母说明了两种不同的观察思路。任务的价值在于它能为哪个问题提供信息，不能因为记录方便就替换原来的研究目标。',
			'The ball and letter tasks illustrate different observation approaches. A task is useful for the question it informs; easy measurement should not replace the original research goal.',
		],
		boundary: [
			'不同设备、熟悉程度和操作方式会影响表现。网页体验不复刻实验条件，不进行跨人排名，也不把一次操作归结为人的能力。',
			'Devices, familiarity and input methods affect performance. This website does not recreate experimental conditions, rank people or infer ability from one attempt.',
		],
		source: '',
		sourceName: '',
		stage: 'after',
	},
	{
		id: 'emg',
		label: ['手臂肌电', 'Arm EMG'],
		title: ['让肌肉活动留下记录。', 'Record muscle activity.'],
		short: [
			'表面肌电记录与肌肉活动有关的电信号。它帮助观察活动的时间与变化，不能直接等同于睡眠状态。',
			'Surface EMG records electrical signals associated with muscle activity. It helps observe activity timing and changes, but does not directly establish sleep state.',
		],
		question: [
			'握松软球，怎样变成可以分析的记录？',
			'How does gripping and releasing a ball become an analyzable record?',
		],
		steps: [
			['握松动作', 'Grip and release'],
			['手臂肌电', 'Arm EMG'],
			['与脑电按时间对照', 'Align with EEG in time'],
		],
		example: [
			'本项目让参与者随呼吸握松软球，用手臂肌电记录动作相关的肌肉活动，再与关灯后同步的脑电等记录对照。这里说明方法关系，不展示量纲尚未充分核实的肌电数值。',
			'In this project, participants grip and release a soft ball with their breathing. Arm EMG records associated muscle activity for comparison with synchronized EEG after lights off. This explains the method relationship; EMG values with insufficiently verified units are not plotted here.',
		],
		boundary: [
			'电极位置、接触质量、动作干扰和分析方法都会影响记录。握不住球不等于已睡着，肌电变化也不独自证明产品功效。下方参考介绍一般原理，不表示该品牌设备被用于本研究。',
			'Electrode placement, contact quality, motion artifacts and analysis affect recordings. Failure to grip does not establish sleep, nor does EMG change alone prove product efficacy. The reference explains general principles and does not identify the equipment used in this study.',
		],
		source:
			'https://support.pluxbiosignals.com/wp-content/uploads/2021/10/biosignalsplux-Electromyography-EMG-User-Manual-1.pdf',
		sourceName: 'PLUX — Electromyography user manual',
		stage: 'during',
	},
] as const satisfies readonly {
	id: string;
	label: Copy;
	title: Copy;
	short: Copy;
	question: Copy;
	steps: readonly Copy[];
	example: Copy;
	boundary: Copy;
	source: string;
	sourceName: string;
	stage: Stage;
}[];
export type MethodId = (typeof methods)[number]['id'];
