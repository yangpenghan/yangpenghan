# LinkedIn + GitHub 个人品牌项目状态

> 最后更新：2026-07-03

## 📊 LinkedIn 优化（手动待执行）

### 状态：内容已准备好，等待 Will 手动操作
> 原因：LinkedIn 反自动化检测严格，browser 工具注入 cookie 后保存会报错，需手动复制粘贴。

### 操作清单（按优先级排序）

**🔥 P0 - 今天花 5 分钟改**
- [ ] **Summary（关于）**：打开 Profile → Add summary → 粘贴 `linkedin-optimization.md` 英文版
- [ ] **Headline（标题）**：改成 `Solution Engineering Lead | Bridging Behavioral Science × AI × Human Factors Engineering | Opening New Market Categories in MedTech, Automotive & Beyond`
- [ ] **Open to work 隐私**：改为 "Recruiters only"，不要公开给所有人看

**🟡 P1 - 本周内改**
- [ ] **Experience 描述优化**：每段经历加 2-3 句量化描述
- [ ] **添加 Skills 关键词**：Human Factors Engineering, EEG, Eye Tracking, Usability Testing, Medical Devices, Behavioral Analysis
- [ ] **添加 Featured 项**：精选演讲 PPT 或项目案例

**🟢 P2 - 后续优化**
- [ ] **添加 Certifications**：国家二级心理咨询师、高中心理教师资格证
- [ ] **添加 Projects**：重要项目案例（客户脱敏）
- [ ] **添加 Publications**：演讲/行业大会发言
- [ ] **Profile 语言设置**：确认是否需要中英双语 Profile

### 关键内容文件
| 文件 | 用途 |
|------|------|
| `linkedin-optimization.md` | 完整优化方案（Headline、Summary、Experience、Skills 等） |
| `profile-info/highlights.md` | 亮点与成果（四套叙事框架） |
| `profile-info/professional.md` | 职业经历详细数据 |
| `profile-info/expertise.md` | 技术栈与工具清单 |
| `profile-info/personality.md` | Profile 风格问题（待回答） |

---

## 📊 GitHub Profile（准备中）

### 状态：资料收集完成 80%，等待 Will 回答风格问题

### 已完成
- ✅ 调研 GitHub 个人品牌最佳实践
- ✅ 项目目录结构创建
- ✅ 五层曝光金字塔策略 + 70-20-10 内容框架 + 四阶段路线图
- ✅ 领域交叉价值梳理
- ✅ NAS 项目扫描（170+ 项目 100+ 客户）
- ✅ 高亮与成果文档（四套叙事框架）
- ✅ 职业经历叙事升级（咨询驱动增长）
- ✅ GitHub 账号信息收集（yangpenghan 账号）

### 待完成
- [x] Will 回答 personality.md 的 5 个风格问题（2026-07-04 完成）
- [ ] 确认 Noldus 内容公开边界
- [x] 起草 GitHub Profile README（2026-07-04 定稿，drafts/profile-readme-final.md）
- [ ] 创建 yangpenghan/yangpenghan 同名仓库并发布
- [ ] Will 提供专业半身照 → 放入 assets/avatar.jpg
- [ ] 开源可展示的项目仓库（精简版 AI PoC、stock-quote 等）
- [ ] 更新 Featured Projects 链接

### Pin 策略（6 个位置）
| 位置 | 类型 | 内容 |
|------|------|------|
| Pin 1 | 深度展示 | 医疗器械可用性分析报告 |
| Pin 2 | 深度展示 | AI Agent 行为分析平台 PoC |
| Pin 3 | 广度展示 | 领域交叉价值 README |
| Pin 4 | 广度展示 | 行为测量工具链 demo |
| Pin 5 | 近期创新 | AI + 行为分析探索项目 |
| Pin 6 | 社区参与 | 开源贡献或行业资源 |

---

## 🔗 LinkedIn MCP 工具（已可用）

- **工具来源**：stickerdaniel/linkedin-mcp-server
- **安装位置**：`~/.openclaw/services/linkedin-mcp-server/`
- **Cookie 存储**：`~/.linkedin-mcp/profile/`
- **已注册 MCP**：`openclaw mcp add linkedin`（17 tools）
- **支持操作**：读取 Profile、搜索人员/公司/职位、查看 Feed、收发消息
- **不支持操作**：编辑 Profile、发帖（只能读取和消息）
- **登录方式**：`cd ~/.openclaw/services/linkedin-mcp-server && uvx --project . mcp-server-linkedin@latest --login --no-headless --login-timeout 300`

---

## 📋 差异化定位

**核心**：行为科学 × 医疗器械可用性 × AI Agent — 极稀缺交叉

**非码农策略**：
- 方案完整度 > 代码量
- 领域洞察 > 开源贡献
- 行业关键词 > 技术栈 badge
