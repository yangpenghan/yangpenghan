export const languages = {
	zh: '中文',
	en: 'English',
} as const;

export type Locale = keyof typeof languages;
export const defaultLocale: Locale = 'zh';

const zh = {
	'index.fitEyebrow': '什么时候找我',
	'index.fitTitle': '你可能正卡在这里。',
	'index.fit1Title': '收集了很多反馈，还是不知道改什么',
	'index.fit1Body': '需要有人回到具体操作，把现象整理成能讨论、能排序、能验证的问题。',
	'index.fit1Link': '看金融 App 研究',
	'index.fit2Title': '想法有了，投入开发前还想确认一下',
	'index.fit2Body': '需要用现有条件模拟关键体验，看看用户会不会理解，找出下一步值得做什么。',
	'index.fit2Link': '看机器人交互研究',
	'index.fit3Title': '反复查资料、整理信息，工作被碎事打断',
	'index.fit3Body': '需要先拆清步骤，再决定哪些用现成工具，哪些交给 AI，哪些判断由人保留。',
	'index.fit3Link': '看我的 AI 工作系统',
	'index.aboutEyebrow': '关于我',
	'index.aboutTitle': '从理解人的行为，\n到重构做事的条件。',
	'index.aboutBody':
		'心理学、四年教学和一线研究，让我习惯看人具体怎么做。一个人“不会用”，可能是入口难找、反馈不清，也可能是流程安排不对。我喜欢把这些条件拆开，再动手试着改变。如今组合 AI 工具，也是同一种思路。',
	'index.aboutLink': '了解我的经历和工作习惯',
	'work.experimentsEyebrow': 'AI 工作与实验',
	'work.experimentsTitle': '我也为自己的问题做工具。',
	'work.experimentsIntro':
		'这里包含日常使用的个人系统，以及尚待真实数据验证的原型。运行状态和验证进度见各案例。',
	'nav.home': '首页',
	'nav.work': '案例',
	'nav.method': '思路与工具',
	'nav.notes': '技术与思考',
	'nav.about': '关于我',
	'nav.contact': '联系',
	'nav.brand': '杨朋翰',
	'nav.brandAlt': 'Will Yang',
	'nav.language': '切换语言',
	'nav.skip': '跳到主要内容',

	'theme.toggle': '切换明暗主题',
	'theme.light': '使用浅色主题',
	'theme.dark': '使用深色主题',

	'index.metaTitle': '杨朋翰 Will Yang — 所有问题都是技术性问题',
	'index.metaDesc':
		'所有问题都是技术性问题。杨朋翰：从技术角度拆解目标、约束与因果关系，重构问题，用研究、实验、代码和 AI 找到可验证的解决办法。',
	'index.eyebrow': '杨朋翰 / 独立的问题解决专家',
	'index.heroTitleA': '所有问题',
	'index.heroTitleB': '都是技术性问题。',
	'index.heroIntro':
		'我负责 Noldus 中国的咨询与业务拓展，把研究用于产品决策，也探索 AI 怎样减少专业工作中的重复劳动。对我来说，“技术”是把难事拆清楚、做出办法，再检验它是否有用。',
	'index.heroRole': 'Noldus 中国咨询与业务拓展负责人',
	'index.heroWork': '看我是怎样理解这句话的',
	'index.heroContact': '看具体问题如何被重构',
	'index.portraitAlt': '杨朋翰（Will Yang）的肖像',
	'index.workEyebrow': '把主张放进真实工作',
	'index.workTitle': '换一个问题，\n才能找到下一步。',
	'index.workIntro':
		'三个案例分别展示：怎样组织产品决策的证据、把验证提前，以及在功能完成前模拟交互。每篇说明我的职责、工作过程与结果边界。',
	'index.workAll': '查看全部案例与实验',
	'index.methodEyebrow': '元思维 / 我怎样检查问题本身',
	'index.methodTitle': '先检查题目，\n再寻找解法。',
	'index.method1Title': '把目标和方案分开',
	'index.method1Body': '“加人”“做培训”“上 AI”已经是方案。我会先问：你想改变的究竟是什么？怎样才算做到了？',
	'index.method2Title': '拆条件，也看关系',
	'index.method2Body':
		'人、信息、工具、流程分别发生了什么？卡点在某个环节，还是在交接之间？哪些限制不能动，哪些只是沿用的习惯？',
	'index.method3Title': '找一个能区分解释的试验',
	'index.method3Body':
		'是用户没理解，还是系统没有回应？先做一个小模拟、回看一段记录，或写一个脚本，让不同解释产生可观察的区别。',
	'index.method4Title': '连自己的判断一起检查',
	'index.method4Body':
		'什么结果会让我改变看法？重构后的问题还对得上原目标吗？办法实际改变了什么？把这些回答清楚，再决定继续、调整或停止。',
	'index.methodMore': '展开我的思路与工具',
	'index.notesEyebrow': '技术与思考',
	'index.notesTitle': '我为什么这样想，\n又如何继续追问。',
	'index.notesAll': '浏览技术与思考',
	'index.talksEyebrow': '公开分享',
	'index.talkSlides': '查看幻灯片（PDF）',
	'index.talksTitle': '公开分享过的问题。',
	'index.talk1Year': '2018',
	'index.talk1Venue': '第六届中国用户体验峰会',
	'index.talk1Topic': 'App 测试中的多模态：用户测试的必要性',
	'index.talk2Year': '2017',
	'index.talk2Venue': '第二届中国（武汉）智能汽车创新发展论坛',
	'index.talk2Topic': '驾驶行为与 ADAS：情绪、眼控等技术的开发应用',
	'index.talk3Year': '2017',
	'index.talk3Venue': '第十七届国际人-机-环境系统工程大会',
	'index.talk3Topic': '人-机-环境中的行为测量',
	'index.talk4Year': '2019',
	'index.talk4Venue': '第七届中国用户体验峰会',
	'index.talk4Topic': '从用户小数据中寻找洞察',
	'index.talk5Year': '2020',
	'index.talk5Venue': '中国用户体验峰会',
	'index.talk5Topic': '医疗器械人因工程中的安全考量',
	'index.talk6Year': '2025',
	'index.talk6Venue': '医疗器械监管科学与法规论坛',
	'index.talk6Topic': '医疗器械可用性工程：尽早发现不可预知的操作错误',
	'work.metaTitle': '案例 | 杨朋翰',
	'work.metaDesc':
		'从金融 App、医疗器械和机器人，到个人 AI 工作流：看杨朋翰如何定义问题、选择办法并推进解决。',
	'work.eyebrow': '案例',
	'work.title': '问题是怎样被重新定义的。',
	'work.intro':
		'我怎样从原来的提问找到一个能动手的切口？每个案例先交代重构的问题，再展开方法、个人贡献与结果。先看三个代表案例，再按你的议题深入；日常 AI 系统和待验证的原型在后半部分。',
	'work.legendDelivered': 'DELIVERED · 已交付',
	'work.legendOperating': 'ONGOING · 持续实践',
	'work.legendPrototype': 'PROTOTYPE · 原型',
	'work.read': '阅读案例',
	'work.systemsEyebrow': '从这里开始',
	'work.systemsTitle': '三个案例，三种判断。',
	'work.studiesEyebrow': '更多项目经验',
	'work.studiesTitle': '在不同场景里，找对要解决的问题。',
	'workDetail.back': '返回案例',
	'workDetail.problem': '问题',
	'workDetail.role': '我的角色',
	'workDetail.approach': '方法',
	'workDetail.outcome': '交付与进展',
	'workDetail.note': '公开说明',
	'workDetail.next': '下一项工作',
	'workDetail.related': '相关思考',
	'workDetail.sourceLabel': '项目说明（主仓库）',
	'workDetail.sourceCodeLabel': '模块源码（OpenClaw fork）',
	'workDetail.tagsLabel': '用到的方法与工具',

	'notes.topicsLabel': '按议题阅读',
	'notes.readingPaths': '查看专题阅读路径',
	'notes.contents': '本文目录',
	'notes.relatedIdeas': '沿着这个问题继续',
	'notes.topic.agentic-ai.title': 'AI 系统与人机协作',
	'notes.topic.agentic-ai.body':
		'从可编程任务到 Agent、记忆与 Skill：技术怎样进入工作，人的维护负担有没有减少，判断又在哪里发生。',
	'notes.topic.behavioral-intelligence.title': '行为、测量与解释',
	'notes.topic.behavioral-intelligence.body':
		'标签保留了什么，行为如何形成序列与结构，多模态之间的支持、冲突和缺失又该怎样解释。',
	'notes.topic.solution-engineering.title': '问题重构、知识与判断',
	'notes.topic.solution-engineering.body':
		'比较结论对谁成立，规则由谁决定，技术怎样交付，知识怎样被下一次工作真正使用。',
	'notes.topic.human-factors.title': '模拟、体验与验证',
	'notes.topic.human-factors.body':
		'虚拟用户怎样接受现实检验，体验为何需要不同时间尺度，以及研究如何进入仍然来得及修改的设计阶段。',
	'notes.metaTitle': '技术与思考 | 杨朋翰',
	'notes.metaDesc':
		'杨朋翰的技术长文与实践笔记：行为标签与序列、多模态证据、虚拟用户验证、AI 工作流、知识协作与判断条件。',
	'notes.eyebrow': '技术与思考',
	'notes.title': '技术与思考',
	'notes.intro':
		'我关注人类行为怎样被观察、解释与模拟，也关注 AI 怎样进入专业工作。标签是否保留意义？模拟怎样被现实推翻？一次成功能否成为可持续的方法？这里从具体问题展开推理，也保留反例、取舍和尚待验证的想法。',
	'notes.read': '阅读这篇文章',
	'notes.back': '返回技术与思考',
	'notes.updated': '更新于',
	'notes.minutes': '分钟阅读',
	'notes.next': '继续阅读',
	'notes.relatedWork': '相关实践',

	'about.metaTitle': '关于 | 杨朋翰 Will Yang',
	'about.metaDesc':
		'杨朋翰的经历与工作习惯：心理学、四年教学、一线用户研究、咨询团队，以及自己动手做工具的实践。',
	'about.eyebrow': '关于我',
	'about.title': '我是杨朋翰。\n研究人，也动手做工具。',
	'about.intro':
		'我学心理学，做过四年教师，2015 年起从事行为研究与解决方案工作，目前负责 Noldus 中国咨询与业务拓展。我习惯先看人实际怎样做，再检查自己的解释；也自己写代码、做工具，尝试改进反复卡住的工作。',
	'about.storyTitle': '这些经历改变了我问问题的方式。',
	'about.story1Year': '2007—2015',
	'about.story1Title': '教得明白，学生也未必用得上',
	'about.story1Body':
		'在华东师范大学学心理学，之后教了四年心理健康和数学。学生课堂上听懂，换个情境却不会用，让我开始关注：对方实际做了什么，在哪一步遇到了困难。',
	'about.story2Year': '2015—2019',
	'about.story2Title': '从听人解释，到看人操作',
	'about.story2Body':
		'2015 年进入 Noldus，参与金融、包装和汽车等项目。一次金融 App 研究在 24 天里完成 60 次测试与访谈。我逐渐学会把“看到的动作”“我的解释”和“建议怎么改”分开，避免过早下结论。',
	'about.story3Year': '2019',
	'about.story3Title': '功能没开发，也能先试交互',
	'about.story3Body':
		'2019 年做服务机器人研究时，我把互动拆成开始之前、如何开始、完成任务和结束。也用后台人工模拟尚未完成的功能，先看人是否理解，再讨论开发投入。',
	'about.story4Year': '2019—现在',
	'about.story4Title': '让下一次工作不必从头开始',
	'about.story4Body':
		'负责咨询业务后，我把项目中的研究设计、记录方法和复盘整理成团队能用的材料。现在也用现成的 Agent 运行时、代码和知识库处理自己的日常任务：遇到反复卡住的步骤，就试着把它改好。',
	'about.practiceEyebrow': '一起工作时',
	'about.practiceTitle': '你会看到的几个习惯。',
	'about.practice1': '先问你已经试过什么',
	'about.practice1Body':
		'我需要知道现有办法为什么没解决问题，以及时间、预算、数据和人员有哪些限制。这些会直接改变方案。',
	'about.practice2': '把不同意见说具体',
	'about.practice2Body':
		'如果我怀疑原来的问题定义，会把理由和观察摆出来。我们可以讨论应该补什么证据，而不只是争论谁更有经验。',
	'about.practice3': '尽早拿东西出来试',
	'about.practice3Body':
		'可能是一份任务清单、一段模拟交互，或一个小工具。做出能检查的东西，才容易发现想法哪里不成立。',
	'about.practice4': '把不知道的留在桌面上',
	'about.practice4Body':
		'我会区分已经看到的结果、自己的解释和待验证的假设。做出了原型，也还要回答它在真实工作中是否可靠。',
	'about.principlesEyebrow': '我如何做取舍',
	'about.principle1': '先看现场，再定方案。',
	'about.principle1Body': '一次停顿可能是困惑，也可能是在认真确认后果。我会先检查具体情境。',
	'about.principle2': '用得上的办法优先。',
	'about.principle2Body': '有时答案是一条使用指引，有时是重新安排测试，有时才需要写程序。',
	'about.principle3': '交接要让别人接得住。',
	'about.principle3Body': '除了结果，也留下判断依据、使用方法和下一步需要检查的地方。',
	'about.education': '教育与资质',
	'about.educationBody':
		'华东师范大学 · 心理学理学学士（2007—2011）\n国家二级心理咨询师 · 用户研究工程师师资 · 交互设计工程师师资',

	'cta.eyebrow': '联系',
	'cta.title': '说说你想做成什么，\n现在卡在哪里。',
	'cta.body':
		'第一封信可以很简单：你想改变什么、已经试过什么、目前有什么限制。我会据此判断能在哪一段帮上忙。商业咨询与人因工程项目通过 Noldus 中国交付；工具共创、研究交流与演讲邀请，可以直接联系我。',
	'cta.button': '讨论项目（Noldus）',
	'cta.personal': '直接写信给我',
	'cta.linkedin': '在 LinkedIn 联系',

	'footer.tagline': '从技术角度重构问题，找到解决办法。',
	'footer.privacy': '本站不使用 Cookie，也不追踪访客。',
	'footer.github': 'GitHub',
	'footer.linkedin': 'LinkedIn',
	'footer.email': 'Email',
	'footer.copyright': '杨朋翰 / Will Yang',

	'404.metaTitle': '页面未找到 | 杨朋翰',
	'404.metaDesc': '请求的页面不存在。',
	'404.eyebrow': '404 · 档案缺页',
	'404.title': '这条线索不在档案里。',
	'404.body': '地址可能已经改变，或者这个页面从未存在。',
	'404.home': '返回首页',
	'404.work': '浏览工作档案',
} as const;

export type UIKey = keyof typeof zh;

const en: Record<UIKey, string> = {
	'index.fitEyebrow': 'When to get in touch',
	'index.fitTitle': 'You may be stuck here.',
	'index.fit1Title': 'Plenty of feedback, no clear next change',
	'index.fit1Body':
		'You need someone to revisit the actual tasks and turn observations into issues the team can discuss, prioritize, and test.',
	'index.fit1Link': 'Read the finance-app case',
	'index.fit2Title': 'An idea needs testing before development',
	'index.fit2Body':
		'You need to simulate the key experience with what is available, see whether people understand it, and decide what deserves investment.',
	'index.fit2Link': 'Read the robot-interaction case',
	'index.fit3Title': 'Repeated lookups and admin interrupt the work',
	'index.fit3Body':
		'You need to break down the process and decide where existing tools, AI, and human judgment each belong.',
	'index.fit3Link': 'See my personal AI work system',
	'index.aboutEyebrow': 'About me',
	'index.aboutTitle': 'From understanding behavior\nto changing how work happens.',
	'index.aboutBody':
		'Psychology, four years of teaching, and field research taught me to watch what people actually do. When someone cannot use something, the cause may be a hidden entry point, unclear feedback, or an awkward process. I like to separate those conditions and try changing them. I bring the same approach to AI tools.',
	'index.aboutLink': 'Read about my background and working habits',
	'work.experimentsEyebrow': 'AI work and experiments',
	'work.experimentsTitle': 'I build tools for my own problems, too.',
	'work.experimentsIntro':
		'These include a system I use daily and prototypes awaiting validation with real research data. Each case states its operating status and what remains to be tested.',
	'nav.home': 'Home',
	'nav.work': 'Cases',
	'nav.method': 'Approach & tools',
	'nav.notes': 'Ideas',
	'nav.about': 'About',
	'nav.contact': 'Contact',
	'nav.brand': 'Will Yang',
	'nav.brandAlt': '杨朋翰',
	'nav.language': 'Switch language',
	'nav.skip': 'Skip to main content',

	'theme.toggle': 'Toggle color theme',
	'theme.light': 'Use light theme',
	'theme.dark': 'Use dark theme',

	'index.metaTitle': 'Will Yang — Every problem is a technical problem',
	'index.metaDesc':
		'Every problem is a technical problem. Will Yang reframes goals, constraints, and causes, then uses research, experiments, code, and AI to test a way forward.',
	'index.eyebrow': 'Will Yang / Independent problem solver',
	'index.heroTitleA': 'Every problem',
	'index.heroTitleB': 'is a technical problem.',
	'index.heroIntro':
		'I lead Consulting and Business Development at Noldus China, use research to inform product decisions, and explore how AI can reduce repetitive professional work. By technical, I mean taking a difficulty apart, building an approach, and checking whether it helps.',
	'index.heroRole': 'Head of Consulting & Business Development, Noldus China',
	'index.heroWork': 'Read what I mean',
	'index.heroContact': 'See the reframing in practice',
	'index.portraitAlt': 'Portrait of Will Yang',
	'index.workEyebrow': 'The claim in practice',
	'index.workTitle': 'A different question.\nA practical next step.',
	'index.workIntro':
		'Three cases on organizing evidence, testing earlier, and simulating an unfinished interaction. Each explains my role, the work, and the limits of the results.',
	'index.workAll': 'See all cases and experiments',
	'index.methodEyebrow': 'Thinking about the question',
	'index.methodTitle': 'Examine the question\nbefore looking for an answer.',
	'index.method1Title': 'Separate goal from proposal',
	'index.method1Body':
		'“Hire more people,” “run training,” and “add AI” are proposals. What change do we actually want, and how will we know it happened?',
	'index.method2Title': 'Inspect conditions and relationships',
	'index.method2Body':
		'What happens across people, information, tools, and handoffs? Is the obstacle within a step or between steps? Which constraints are fixed, and which are habits?',
	'index.method3Title': 'Test competing explanations',
	'index.method3Body':
		'Did the person misunderstand, or did the system fail to respond? Use a simulation, a recording, or a script to look for an observable difference.',
	'index.method4Title': 'Check my own reasoning, too',
	'index.method4Body':
		'What result would change my mind? Does the reframed question still serve the original goal? What did the intervention change? Then continue, adjust, or stop.',
	'index.methodMore': 'Explore my approach and tools',
	'index.notesEyebrow': 'Technology & ideas',
	'index.notesTitle': 'Why I think this way.\nWhat I question next.',
	'index.notesAll': 'Explore ideas',
	'index.talksEyebrow': 'Selected talks',
	'index.talkSlides': 'View slides (Chinese PDF)',
	'index.talksTitle': 'Questions I have discussed in public.',
	'index.talk1Year': '2018',
	'index.talk1Venue': '6th China User Experience Summit',
	'index.talk1Topic': 'Multimodality in app testing: why user testing matters',
	'index.talk2Year': '2017',
	'index.talk2Venue': '2nd China Smart Vehicle Innovation Forum',
	'index.talk2Topic': 'Driving behavior and ADAS: emotion, eye control, and applications',
	'index.talk3Year': '2017',
	'index.talk3Venue': '17th International Human–Machine–Environment Systems Conference',
	'index.talk3Topic': 'Behavioral measurement in human–machine–environment systems',
	'index.talk4Year': '2019',
	'index.talk4Venue': '7th China User Experience Summit',
	'index.talk4Topic': 'Finding insight in small user data',
	'index.talk5Year': '2020',
	'index.talk5Venue': 'China User Experience Summit',
	'index.talk5Topic': 'Safety in medical-device human factors engineering',
	'index.talk6Year': '2025',
	'index.talk6Venue': 'Medical Device Regulatory Science & Regulation Forum',
	'index.talk6Topic': 'Medical-device usability engineering: finding unpredictable use errors earlier',
	'work.metaTitle': 'Cases | Will Yang',
	'work.metaDesc':
		'My choices and contributions across finance apps, medical devices, robots, and personal AI workflows.',
	'work.eyebrow': 'Cases',
	'work.title': 'How the question changed.',
	'work.intro':
		'How did I find a question we could act on? Each case starts with the reframing, then explains the approach, my contribution, and the result. Start with three representative cases; personal AI systems and prototypes follow below.',
	'work.legendDelivered': 'DELIVERED',
	'work.legendOperating': 'ONGOING PRACTICE',
	'work.legendPrototype': 'PROTOTYPE',
	'work.read': 'Read case study',
	'work.systemsEyebrow': 'Start here',
	'work.systemsTitle': 'Three cases that show how I think.',
	'work.studiesEyebrow': 'More project experience',
	'work.studiesTitle': 'Finding the right question in each setting.',
	'workDetail.back': 'Back to cases',
	'workDetail.problem': 'Problem',
	'workDetail.role': 'My role',
	'workDetail.approach': 'Approach',
	'workDetail.outcome': 'Delivery & progress',
	'workDetail.note': 'Public note',
	'workDetail.next': 'Next project',
	'workDetail.related': 'Related thinking',
	'workDetail.sourceLabel': 'Project overview (main repo)',
	'workDetail.sourceCodeLabel': 'Module source (OpenClaw fork)',
	'workDetail.tagsLabel': 'Methods & tools used',

	'notes.topicsLabel': 'Explore by subject',
	'notes.readingPaths': 'Explore the reading paths',
	'notes.contents': 'On this page',
	'notes.relatedIdeas': 'Follow the question further',
	'notes.topic.agentic-ai.title': 'AI systems & human collaboration',
	'notes.topic.agentic-ai.body':
		'Programmable tasks, agents, memory, and skills: how technology enters work, what effort remains, and where judgment belongs.',
	'notes.topic.behavioral-intelligence.title': 'Behavior, measurement & interpretation',
	'notes.topic.behavioral-intelligence.body':
		'What labels retain, how actions form sequences, and how to interpret support, conflict, and missing evidence across modalities.',
	'notes.topic.solution-engineering.title': 'Reframing, knowledge & judgment',
	'notes.topic.solution-engineering.body':
		'Whom a comparison describes, who sets the rules, how technology can be delivered, and how knowledge enters the next task.',
	'notes.topic.human-factors.title': 'Simulation, experience & validation',
	'notes.topic.human-factors.body':
		'How virtual users face real evidence, why experience needs different time scales, and when research can still change a design.',
	'notes.metaTitle': 'Technology & ideas | Will Yang',
	'notes.metaDesc':
		'Essays and practice notes by Will Yang on behavioral meaning, sequences, multimodal evidence, virtual users, AI workflows, knowledge, and judgment.',
	'notes.eyebrow': 'Technology & ideas',
	'notes.title': 'Technology & ideas',
	'notes.intro':
		'I explore how behavior is observed, interpreted, and simulated, and how AI enters professional work. Do labels retain meaning? Can reality contradict a simulation? Can one success become a sustainable method? These essays develop the reasoning, counterexamples, tradeoffs, and questions still open.',
	'notes.read': 'Read essay',
	'notes.back': 'Back to ideas',
	'notes.updated': 'Updated',
	'notes.minutes': 'min read',
	'notes.next': 'Read next',
	'notes.relatedWork': 'Related practice',

	'about.metaTitle': 'About | Will Yang',
	'about.metaDesc':
		'Will Yang’s background and working habits: psychology, four years of teaching, field research, consulting, and building tools.',
	'about.eyebrow': 'About me',
	'about.title': 'I’m Will Yang.\nI study people and build tools.',
	'about.intro':
		'I studied psychology, taught for four years, and have worked in behavioral research and solutions since 2015. I now lead Consulting and Business Development at Noldus China. I look at what people actually do, question my own explanations, and build tools to improve work that repeatedly gets stuck.',
	'about.storyTitle': 'Experiences that changed the questions I ask.',
	'about.story1Year': '2007—2015',
	'about.story1Title': 'A clear lesson did not always transfer',
	'about.story1Body':
		'After studying psychology at East China Normal University, I taught psychology and mathematics for four years. Students could follow a lesson yet struggle in another situation. I started paying closer attention to what they actually did and where they got stuck.',
	'about.story2Year': '2015—2019',
	'about.story2Title': 'From hearing explanations to watching actions',
	'about.story2Body':
		'I joined Noldus in 2015 and worked on finance, packaging, and automotive studies. One finance-app project involved 60 tests and interviews in 24 days. I learned to keep the observed action, my interpretation, and a proposed change separate.',
	'about.story3Year': '2019',
	'about.story3Title': 'Trying an interaction before building the feature',
	'about.story3Body':
		'In service-robot research in 2019, I separated an encounter into attraction, starting, completing a task, and ending. I also used a researcher behind the scenes to simulate unfinished features and test understanding before engineering investment.',
	'about.story4Year': '2019—present',
	'about.story4Title': 'Making the next project easier to start',
	'about.story4Body':
		'As I took responsibility for consulting, I turned research designs, recording methods, and reviews into materials the team could use. I now also use existing agent runtimes, code, and knowledge bases for my daily work, improving steps that repeatedly get in the way.',
	'about.practiceEyebrow': 'Working with me',
	'about.practiceTitle': 'Habits you would notice.',
	'about.practice1': 'I ask what you have already tried',
	'about.practice1Body':
		'I need to understand why the current approach has not worked and what limits your time, budget, data, and people. Those constraints change the plan.',
	'about.practice2': 'I make disagreement specific',
	'about.practice2Body':
		'If I question the brief, I put my observations and reasons on the table. We can discuss what evidence is missing and how to get it.',
	'about.practice3': 'I make something we can try early',
	'about.practice3Body':
		'It may be a task list, a simulated interaction, or a small tool. Something we can inspect helps expose where an idea does not hold up.',
	'about.practice4': 'I keep uncertainty visible',
	'about.practice4Body':
		'I distinguish observed results, my interpretation, and assumptions awaiting a test. A working prototype still needs to prove useful and reliable in practice.',
	'about.principlesEyebrow': 'How I make choices',
	'about.principle1': 'Look at the situation first.',
	'about.principle1Body':
		'A pause can mean confusion or careful consideration of consequences. I check the context before proposing a change.',
	'about.principle2': 'Choose an approach people can use.',
	'about.principle2Body':
		'Sometimes that means an instruction on packaging, sometimes an earlier study, and sometimes writing a program.',
	'about.principle3': 'Make the handover usable.',
	'about.principle3Body':
		'Alongside results, leave the reasoning, instructions, and questions that still need checking.',
	'about.education': 'Education & credentials',
	'about.educationBody':
		'East China Normal University · BSc Psychology (2007—2011)\nCertified Psychological Counselor (Level 2, China national certification) · UX Research instructor · Interaction Design instructor',

	'cta.eyebrow': 'Contact',
	'cta.title': 'What are you trying to do?\nWhere is it stuck?',
	'cta.body':
		'A first email can be simple: the change you want, what you have tried, and your constraints. That helps me judge where I can contribute. Commercial consulting and human-factors projects are delivered through Noldus China. For building tools together, research discussions, or talks, contact me directly.',
	'cta.button': 'Discuss a project (Noldus)',
	'cta.personal': 'Write to me directly',
	'cta.linkedin': 'Connect on LinkedIn',

	'footer.tagline': 'Reframe the problem. Build and test a way forward.',
	'footer.privacy': 'No cookies. No visitor tracking.',
	'footer.github': 'GitHub',
	'footer.linkedin': 'LinkedIn',
	'footer.email': 'Email',
	'footer.copyright': 'Will Yang / 杨朋翰',

	'404.metaTitle': 'Page not found | Will Yang',
	'404.metaDesc': 'The requested page does not exist.',
	'404.eyebrow': '404 · Missing file',
	'404.title': 'This lead is not in the archive.',
	'404.body': 'The address may have changed, or the page may never have existed.',
	'404.home': 'Return home',
	'404.work': 'Browse the work archive',
};

export const ui = { zh, en } as const;
