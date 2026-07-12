export const languages = {
  zh: '中',
  en: 'EN',
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'zh';

export const ui = {
  zh: {
    // Nav
    'nav.home': '首页',
    'nav.work': '作品',
    'nav.about': '关于',
    'nav.menu': '菜单',
    'nav.brand': '杨朋翰',

    // Index — Hero
    'index.heroTitle': '你好，我是杨朋翰',
    'index.heroTagline':
      'Noldus 咨询与业务拓展负责人。在中国率先引入 IEC 62366 可用性工程，用行为科学 + AI 为 25+ 家企业解决真实问题。',
    'index.pill1': '行为科学',
    'index.pill2': '10+ 年 · 25+ 企业',
    'index.pill3': 'AI 探索者',
    'index.portraitAlt': '杨朋翰 — 行为科学与 AI 专家',

    // Index — Selected Work
    'index.selectedWorkTitle': '精选作品',
    'index.selectedWorkDesc':
      '四个代表性项目——从在中国率先引入 IEC 62366 可用性工程，到为奔驰交付百万级 HMI/UX 评估框架，再到多智能体 AI 平台 PsyPhiClaw。',
    'index.viewAll': '查看全部',

    // Index — Talks
    'index.talksTitle': '演讲与出席',
    'index.talksDesc': '在用户体验、智能汽车与人-机-环境工程等行业的会议上分享行为测量与可用性工程实践。',
    'index.talk1': '第六届中国用户体验峰会',
    'index.talk1Sub': 'App 测试中的多模态：用户测试的必要性（2018）',
    'index.talk2': '中国智能汽车创新发展论坛',
    'index.talk2Sub': '驾驶行为与 ADAS —— 情绪、眼控等技术的开发应用（2017）',
    'index.talk3': '国际人-机-环境系统工程大会',
    'index.talk3Sub': '人-机-环境中的行为测量（2017）',

    // Skills
    'skills.bsTitle': '行为科学',
    'skills.bsDesc':
      '10 余年破译人类行为——从 eye tracking、EEG 到面部表情分析，在研究与真实影响之间搭建桥梁。',
    'skills.aiTitle': 'AI 驱动分析',
    'skills.aiDesc':
      '探索多智能体系统与 LLM 驱动的工具，把数周的人工行为编码工作，压缩到几分钟内自动完成。',
    'skills.psTitle': '问题解决者',
    'skills.psDesc':
      '服务 25+ 企业客户，年增长 243%。从在中国率先引入 IEC 62366 可用性工程流程，到打造百万级的汽车 HMI/UX 评估合作——我用同样的系统性方法应对每一个挑战。',

    // About
    'about.metaTitle': '关于 | 杨朋翰',
    'about.metaDesc': '行为科学 × AI × 人因工程 — 问题解决者',
    'about.heroTitle': '关于',
    'about.heroTagline': '在行为科学、AI 与人因工程交汇处的问题解决者。',
    'about.heroImgAlt': '行为分析与可用性测试',
    'about.backgroundTitle': '背景',
    'about.statsTitle': '关键数字',
    'about.stat1Num': '170+',
    'about.stat1Label': '项目',
    'about.stat2Num': '100+',
    'about.stat2Label': '客户',
    'about.stat3Num': '7',
    'about.stat3Label': '大行业',
    'about.stat4Num': '243%',
    'about.stat4Label': '同比增长（2024）',
    'about.bgP1':
      '故事从华东师范大学的心理学实验室开始。我意识到：理解人类行为不能只靠问卷和直觉——它需要可量化的测量、严谨的实验设计，以及对数据的敬畏。2011 年毕业后，我先做了 4 年一线心理与数学教师，然后带着这份对"用数据看见人"的执念进入行为研究行业。',
    'about.bgP2':
      '2015 年起，我在 Noldus 从研究经理做起，用 eye tracking、EEG、面部表情分析和电生理仪器为甲方定制人类行为洞察研究——从某金融 APP 跨 6 城测试发现 84 个问题，到用 EEG + eye tracking 评估伊利酸奶包装。期间还曾在猎豹移动负责人-机器人交互（HRI）研究，探索提示音、动作、表情如何塑造人对机器人的感知。',
    'about.bgP3':
      '2019 年回到 Noldus 担任 Consulting Manager，从零组建 Solution Engineering 团队，把零散的咨询打包成标准化解决方案，连续开辟医疗器械人因、汽车人因、建筑人因、航空人因等新赛道。这套"咨询驱动增长"模式年均撬动千万级产品订单转化，2024 年实现 243% 同比增长。',
    'about.bgP4':
      '当下，我把主要精力放在两件事上：一是用多智能体 AI 重构行为数据分析流程（PsyPhiClaw 平台），把数周的人工编码压缩到几分钟；二是探索 Agentic AI 在可用性工程与咨询交付中的落地。我相信，行为科学与 AI 的交汇处，正是下一个突破发生的地方。',
    'about.educationTitle': '教育',
    'about.edu1': '华东师范大学 — 心理学（理学学士，2007–2011）',
    'about.edu1Sub': '985 / 211 院校 · 国家二级心理咨询师 · UX 研究工程师讲师',
    'about.expertiseTitle': '核心专长',
    'about.expMeasurement': '测量方法',
    'about.expMeasurementItems': 'Eye tracking · EEG · 面部表情 · Biosignals · 行为编码',
    'about.expStandards': '标准',
    'about.expStandardsItems': 'IEC 62366 · ANSI/AAMI HE75 · ISO 14971 · NMPA',
    'about.expResearch': '研究方法',
    'about.expResearchItems': '可用性测试 · 实验设计 · 跨文化研究',
    'about.expTech': '技术与 AI',
    'about.expTechItems': 'Python · LLM API · 多智能体系统 · RAG · n8n 自动化',
    'about.philosophyTitle': '理念',
    'about.philosophyQuote': '最好的解决方案，源自跨学科的碰撞。',
    'about.philosophyDesc':
      '查理·芒格的思维模型、侯世达的认知哲学、乔布斯对卓越的执着，一直在塑造我的思考方式。始终在学习，始终在构建。',

    // Work listing
    'work.metaTitle': '我的作品 | 杨朋翰',
    'work.metaDesc': '了解杨朋翰最近的项目与过往经验',
    'work.heroTitle': '我的作品',
    'work.heroTagline': '在下方查看我最近的项目，了解我的过往经验。',

    // Work detail
    'workDetail.back': '作品',

    // Contact CTA
    'cta.title': '有兴趣合作吗？',
    'cta.button': '给我发消息',

    // Footer
    'footer.tagline': '行为科学 × AI × 人因工程',
    'footer.copyright': '杨朋翰',
    'footer.github': 'GitHub',
    'footer.linkedin': 'LinkedIn',
    'footer.email': '邮箱',

    // 404
    '404.metaTitle': '页面未找到',
    '404.metaDesc': '404 错误——未找到此页面',
    '404.heroTitle': '页面未找到',
    '404.heroTagline': '未找到',

    // Meta defaults
    'meta.defaultTitle': '杨朋翰 — 问题解决者',
    'meta.defaultDesc': '行为科学 × AI × 人因工程',

    // Theme toggle (sr-only)
    'theme.dark': '深色主题',
  },

  en: {
    // Nav
    'nav.home': 'Home',
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.menu': 'Menu',
    'nav.brand': 'Will Yang',

    // Index — Hero
    'index.heroTitle': "Hello, I'm Will Yang",
    'index.heroTagline':
      'Head of Consulting & Business Development at Noldus. Pioneered IEC 62366 usability engineering in China, solving real problems for 25+ enterprises with behavioral science + AI.',
    'index.pill1': 'Behavioral Science',
    'index.pill2': '10+ yrs · 25+ clients',
    'index.pill3': 'AI Explorer',
    'index.portraitAlt': 'Will Yang — behavioral science and AI specialist',

    // Index — Selected Work
    'index.selectedWorkTitle': 'Selected Work',
    'index.selectedWorkDesc':
      'Four representative projects — from pioneering IEC 62366 usability engineering in China, to delivering a million-level HMI/UX evaluation framework for Mercedes-Benz, to the multi-agent AI platform PsyPhiClaw.',
    'index.viewAll': 'View All',

    // Index — Talks
    'index.talksTitle': 'Talks & Appearances',
    'index.talksDesc':
      'Speaking on behavioral measurement and usability engineering at UX, smart-mobility, and human-machine-environment conferences.',
    'index.talk1': 'China User Experience Summit (6th)',
    'index.talk1Sub': 'Multimodality in App testing: why user testing matters (2018)',
    'index.talk2': 'China Smart Vehicle Innovation Forum',
    'index.talk2Sub': 'Driving behavior & ADAS — emotion, eye-control and beyond (2017)',
    'index.talk3': 'Intl. Human-Machine-Environment Systems Engineering Conference',
    'index.talk3Sub': 'Behavioral measurement in human-machine-environment systems (2017)',

    // Skills
    'skills.bsTitle': 'Behavioral Science',
    'skills.bsDesc':
      '10+ years decoding human behavior — from eye tracking and EEG to facial expression analysis. Building bridges between research and real-world impact.',
    'skills.aiTitle': 'AI-Powered Analysis',
    'skills.aiDesc':
      'Exploring multi-agent systems and LLM-powered tools to transform weeks of manual behavioral coding into minute-level automated insights.',
    'skills.psTitle': 'Problem Solver',
    'skills.psDesc':
      '25+ enterprise clients, 243% YoY growth. From pioneering IEC 62366 in China to million-level automotive UX partnerships — every challenge gets the same systematic treatment.',

    // About
    'about.metaTitle': 'About | Will Yang',
    'about.metaDesc': 'Behavioral Science × AI × Human Factors — Problem Solver',
    'about.heroTitle': 'About',
    'about.heroTagline':
      'A problem solver at the intersection of behavioral science, AI, and human factors engineering.',
    'about.heroImgAlt': 'Behavioral analysis and usability testing',
    'about.backgroundTitle': 'Background',
    'about.statsTitle': 'Key numbers',
    'about.stat1Num': '170+',
    'about.stat1Label': 'Projects',
    'about.stat2Num': '100+',
    'about.stat2Label': 'Clients',
    'about.stat3Num': '7',
    'about.stat3Label': 'Industries',
    'about.stat4Num': '243%',
    'about.stat4Label': 'YoY growth (2024)',
    'about.bgP1':
      "My story starts in the psychology labs at East China Normal University. I realized early on that understanding human behavior takes more than surveys and intuition — it demands quantifiable measurement, rigorous experimental design, and respect for the data. After graduating in 2011, I spent four years as a front-line psychology and math teacher before carrying that conviction — seeing people through data — into behavioral research.",
    'about.bgP2':
      "From 2015, I built my craft at Noldus as a research manager, running bespoke human-behavior insight studies with eye tracking, EEG, facial-expression analysis, and biophysiological instruments — from a 6-city study that surfaced 84 issues in a financial app, to EEG + eye-tracking evaluations of Yili yogurt packaging. Along the way I also led human-robot interaction (HRI) research at Cheetah Mobile, exploring how sound, motion, and expression shape people's perception of robots.",
    'about.bgP3':
      "In 2019 I returned to Noldus as Consulting Manager. I built the Solution Engineering team from scratch, productized scattered consulting into standardized solutions, and opened up entirely new tracks — medical-device human factors, automotive human factors, architectural human factors, aviation human factors. This consulting-led growth engine now drives eight-figure product orders every year, with 243% YoY growth in 2024.",
    'about.bgP4':
      "Today I focus on two things: rebuilding behavioral-data analysis with multi-agent AI (the PsyPhiClaw platform), compressing weeks of manual coding into minutes; and operationalizing Agentic AI inside usability engineering and consulting delivery. I believe the next breakthrough lies where behavioral science meets AI.",
    'about.educationTitle': 'Education',
    'about.edu1': 'East China Normal University — Psychology (B.Sc., 2007–2011)',
    'about.edu1Sub': '985 / 211 university · National Level 2 Psychological Counselor · UX Research Engineer Instructor',
    'about.expertiseTitle': 'Core Expertise',
    'about.expMeasurement': 'Measurement',
    'about.expMeasurementItems': 'Eye tracking · EEG · Facial expression · Biosignals · Behavior coding',
    'about.expStandards': 'Standards',
    'about.expStandardsItems': 'IEC 62366 · ANSI/AAMI HE75 · ISO 14971 · NMPA',
    'about.expResearch': 'Research Methods',
    'about.expResearchItems': 'Usability testing · Experimental design · Cross-cultural studies',
    'about.expTech': 'Tech & AI',
    'about.expTechItems': 'Python · LLM APIs · Multi-Agent systems · RAG · n8n automation',
    'about.philosophyTitle': 'Philosophy',
    'about.philosophyQuote': 'The best solutions emerge from interdisciplinary collisions.',
    'about.philosophyDesc':
      "Mentored by Charlie Munger's mental models, Douglas Hofstadter's cognitive philosophy, and Steve Jobs' obsession with excellence. Always learning, always building.",

    // Work listing
    'work.metaTitle': 'My Work | Will Yang',
    'work.metaDesc': "Learn about Will Yang's most recent projects",
    'work.heroTitle': 'My Work',
    'work.heroTagline': 'See my most recent projects below to get an idea of my past experience.',

    // Work detail
    'workDetail.back': 'Work',

    // Contact CTA
    'cta.title': 'Interested in working together?',
    'cta.button': 'Send Me a Message',

    // Footer
    'footer.tagline': 'Behavioral Science × AI × Human Factors',
    'footer.copyright': 'Will Yang',
    'footer.github': 'GitHub',
    'footer.linkedin': 'LinkedIn',
    'footer.email': 'Email',

    // 404
    '404.metaTitle': 'Not Found',
    '404.metaDesc': '404 Error — this page was not found',
    '404.heroTitle': 'Page Not Found',
    '404.heroTagline': 'Not found',

    // Meta defaults
    'meta.defaultTitle': 'Will Yang — Problem Solver',
    'meta.defaultDesc': 'Behavioral Science × AI × Human Factors',

    // Theme toggle (sr-only)
    'theme.dark': 'Dark theme',
  },
} as const;

export type UIKey = keyof (typeof ui)['zh'];
