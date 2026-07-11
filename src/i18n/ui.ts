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
    'index.heroTagline': '在行为科学、AI 与人因工程的交汇处，拆解复杂问题。',
    'index.pill1': '行为科学',
    'index.pill2': '问题解决者',
    'index.pill3': 'AI 探索者',
    'index.portraitAlt': '杨朋翰 — 行为科学与 AI 专家',

    // Index — Selected Work
    'index.selectedWorkTitle': '精选作品',
    'index.selectedWorkDesc': '通过行为分析与 AI 解决真实世界的问题——从医疗器械到汽车用户体验。',
    'index.viewAll': '查看全部',

    // Index — Talks
    'index.talksTitle': '演讲与出席',
    'index.talksDesc': '受邀在行业会议上分享行为科学、可用性工程与 AI 驱动分析的洞察。',
    'index.talk1': '中国 UX 峰会',
    'index.talk2': '智能汽车论坛',
    'index.talk3': 'HME 会议',
    'index.talk4': 'IEC 62366 研讨会',
    'index.talk5': 'AI 与行为科学',

    // Skills
    'skills.bsTitle': '行为科学',
    'skills.bsDesc':
      '10 余年解读人类行为——从眼动追踪、脑电到面部表情分析，在研究与现实影响之间搭建桥梁。',
    'skills.aiTitle': 'AI 驱动分析',
    'skills.aiDesc':
      '探索多智能体系统与 LLM 驱动的工具，将数周的人工行为编码转化为分钟级的自动化洞察。',
    'skills.psTitle': '问题解决者',
    'skills.psDesc':
      '服务 25+ 企业客户，年增长 243%。从在中国开创 IEC 62366，到百万级的汽车 UX 合作——每一个挑战都获得同样的系统性对待。',

    // About
    'about.metaTitle': '关于 | 杨朋翰',
    'about.metaDesc': '行为科学 × AI × 人因工程 — 问题解决者',
    'about.heroTitle': '关于',
    'about.heroTagline': '在行为科学、AI 与人因工程交汇处的问题解决者。',
    'about.heroImgAlt': '行为分析与可用性测试',
    'about.backgroundTitle': '背景',
    'about.bgP1':
      '在行为科学领域深耕 10 余年，我专注于弥合人类认知与技术之间的鸿沟。现居北京，我在全球行为研究解决方案领导者 Noldus 负责咨询与业务拓展，服务覆盖医疗器械、汽车和研究行业的 25+ 家企业。',
    'about.bgP2':
      '我的方法始终如一：拆解它、分析它、找到最短路径、执行。无论是在中国开创 IEC 62366 可用性工程流程、构建百万级的汽车 HMI/UX 评估框架，还是探索用于行为数据洞察的多智能体 AI——每一个挑战都获得同样的系统性对待。',
    'about.bgP3':
      '近来，我深入探索 Agentic AI，构建概念验证平台，将数周的人工行为编码转化为分钟级的自动化洞察。我相信，行为科学与 AI 的交汇处，正是下一个突破发生的地方。',
    'about.educationTitle': '教育',
    'about.edu1': '华东师范大学 — 心理学',
    'about.edu1Sub': '国家二级心理咨询师 · UX 研究工程师讲师',
    'about.expertiseTitle': '核心专长',
    'about.expMeasurement': '测量方法',
    'about.expMeasurementItems': '眼动追踪 · 脑电 · 面部表情 · 生理信号 · 行为编码',
    'about.expStandards': '标准',
    'about.expStandardsItems': 'IEC 62366 · ANSI/AAMI HE75 · ISO 14971 · NMPA',
    'about.expResearch': '研究方法',
    'about.expResearchItems': '可用性测试 · 实验设计 · 跨文化研究',
    'about.expTech': '技术与 AI',
    'about.expTechItems': 'Python · LLM API · 多智能体系统 · RAG · n8n 自动化',
    'about.philosophyTitle': '理念',
    'about.philosophyQuote': '最好的解决方案，源自跨学科的碰撞。',
    'about.philosophyDesc':
      '受查理·芒格的思维模型、侯世达的认知哲学，以及乔布斯对卓越的执着所启发。始终在学习，始终在构建。',

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
      'I break down complex challenges at the intersection of behavioral science, AI, and human factors engineering.',
    'index.pill1': 'Behavioral Science',
    'index.pill2': 'Problem Solver',
    'index.pill3': 'AI Explorer',
    'index.portraitAlt': 'Will Yang — behavioral science and AI specialist',

    // Index — Selected Work
    'index.selectedWorkTitle': 'Selected Work',
    'index.selectedWorkDesc':
      'Solving real-world problems through behavioral analysis and AI — from medical devices to automotive UX.',
    'index.viewAll': 'View All',

    // Index — Talks
    'index.talksTitle': 'Talks & Appearances',
    'index.talksDesc':
      'Invited to share insights on behavioral science, usability engineering, and AI-powered analysis at industry conferences.',
    'index.talk1': 'China UX Summit',
    'index.talk2': 'Smart Auto Forum',
    'index.talk3': 'HME Conference',
    'index.talk4': 'IEC 62366 Workshop',
    'index.talk5': 'AI & Behavioral Science',

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
    'about.bgP1':
      "With 10+ years in behavioral science, I specialize in bridging the gap between human cognition and technology. Currently based in Beijing, I lead consulting and business development at Noldus, a world leader in behavioral research solutions — serving 25+ enterprises across medical devices, automotive, and research industries.",
    'about.bgP2':
      "My approach is always the same: break it down, analyze it, find the shortest path, execute. Whether it's pioneering IEC 62366 usability engineering processes in China, building million-level automotive HMI/UX evaluation frameworks, or exploring multi-agent AI for behavioral data insights — every challenge gets the same systematic treatment.",
    'about.bgP3':
      "Recently, I've been diving deep into Agentic AI, building proof-of-concept platforms that transform weeks of manual behavioral coding into minute-level automated insights. The intersection of behavioral science and AI is where I believe the next breakthrough will happen.",
    'about.educationTitle': 'Education',
    'about.edu1': 'East China Normal University — Psychology',
    'about.edu1Sub': 'National Level 2 Psychological Counselor · UX Research Engineer Instructor',
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
