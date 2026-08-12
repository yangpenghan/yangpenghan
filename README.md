# Will Yang — Behavioral Intelligence Builder

杨朋翰（Will Yang）的双语个人网站。它不是简历模板，而是一套持续更新的专家出版系统：用经过边界审查的案例、方法文章与公开实验，记录行为科学、人因工程、解决方案工程和 Agentic AI 的交叉实践。

线上地址：[yangpenghan.github.io/yangpenghan](https://yangpenghan.github.io/yangpenghan/)

## Information architecture

- `/` 与 `/en/`：中英文首页
- `/work/`：案例档案；每个案例都有结果、角色、方法与保密边界
- `/notes/`：原创方法文章
- `/about/`：职业路径、实践领域与工作原则
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
```

## Editing content

案例位于 `src/content/work/{zh,en}`，文章位于 `src/content/notes/{zh,en}`。中英文内容使用相同 slug；新增字段前先更新 `src/content.config.ts`。

网站只发布可公开验证的信息。客户设备细节、参与者数据、合同、收入和内部绩效不进入此仓库。完整调研、资料边界、设计决策与发布记录保存在独立私有过程库。

## Design direction

视觉语言来自研究档案与现场笔记：暖纸底、墨色正文、朱红信号色、清晰编号和高密度编辑排版。浅色/深色主题遵循系统偏好，也允许手动切换；动效会尊重 `prefers-reduced-motion`。

## Deployment

推送 `main` 后，`.github/workflows/deploy.yml` 构建并发布到 GitHub Pages。生产配置固定使用：

```js
site: 'https://yangpenghan.github.io'
base: '/yangpenghan/'
```

不要在公开仓库提交本地研究材料、过程文档或未确认公开边界的客户信息。
