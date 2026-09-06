# Will Yang — Independent Problem Solver

杨朋翰（Will Yang）的双语个人网站。核心主张是“所有问题都是技术性问题”：拆解目标、约束与关系，重构问题，用可及工具寻找可检验的办法。通过案例、元思维和工具箱，帮助潜在合作方理解我的判断与工作方式。

叙事与编辑依据见 [核心主张重构](docs/technical-problem-narrative.md) 与 [内容审评](docs/content-narrative-review.md)。可视化的逐页评估、素材来源与选择见 [可视化审评](docs/visual-storytelling-audit.md)；最新图形重做见 [视觉精修](docs/visual-refinement.md)。

线上地址：[yangpenghan.github.io/yangpenghan](https://yangpenghan.github.io/yangpenghan/)

## Information architecture

- `/` 与 `/en/`：中英文首页
- `/work/`：代表案例、更多项目经验、AI 工作与实验；说明角色、方法、交付与验证进度
- `/method/`：元思维、问题重构对照、实际工具箱，以及合作的起点与交接内容
- `/notes/`：技术与思考；22 篇文章、双语共 44 个文章页面，包含四条专题阅读路径，以及问题重构、AI 协作、行为解释、模拟验证四个议题
- `/about/`：经历、工作习惯、公开分享与资质
- `/404.html`：GitHub Pages 的双语错误页

## Stack

- Astro 7，静态输出
- Astro Content Collections + Zod schema
- 原生 Astro 组件与 CSS，无客户端 UI 框架
- Astro i18n，中文为默认语言，英文使用 `/en/` 前缀
- GitHub Actions + GitHub Pages

## Local development

```bash
npm install
npx astro dev --background
```

开发服务器管理：

```bash
npx astro dev status
npx astro dev logs
npx astro dev stop
```

完整质量门：

```bash
npm run verify
```

它依次执行 Biome、Astro 类型检查、Vitest 和生产构建。

开发服务器运行时，可以复现浏览器、可访问性、坏链和移动端审计：

```bash
npm run audit:browser
npm run audit:visuals
```

`audit:visuals` 检查双语桌面/手机的案例推演、键盘切换、图形 ID、议题入口、演讲图片加载与无 JavaScript 降级，并保存截图。服务不在默认端口时设置 `SITE_URL`。

## Editing content

案例位于 `src/content/work/{zh,en}`，文章位于 `src/content/notes/{zh,en}`。中英文内容使用相同 slug；新增字段前先更新 `src/content.config.ts`。

专题顺序由 `src/i18n/reading-paths.ts` 维护，栏目与详情页共用。长文目录由正文二级标题生成；“继续阅读”优先沿专题推进。新增文章后检查双语配对、专题目标与正文链接。本轮十二个议题的内容映射与编辑边界见 [长文扩展方案](docs/thinking-expansion-plan.md)。

网站只发布可公开验证的信息。客户设备细节、参与者数据、合同、收入和内部绩效不进入此仓库。完整调研、资料边界、设计决策与发布记录保存在独立私有过程库。

## Design direction

视觉采用个人品牌 V2：冷灰阅读底色、深色正文、紫灰作者标识和蓝色交互信号，配合本地字体与双语签名。详见 [视觉系统说明](docs/visual-system.md)。浅色/深色主题遵循系统偏好，也允许手动切换；动效会尊重 `prefers-reduced-motion`。

## Deployment

推送 `main` 后，`.github/workflows/deploy.yml` 构建并发布到 GitHub Pages。生产配置固定使用：

```js
site: 'https://yangpenghan.github.io'
base: '/yangpenghan/'
```

不要在公开仓库提交本地研究材料、过程文档或未确认公开边界的客户信息。
