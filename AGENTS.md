## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## 项目质量与证据

- 视觉修改优先遵循 `DESIGN.md` 和现有 design tokens，不另建平行样式体系。
- 使用 humanizer 润色中文时必须保留事实、数字、限定语和来源状态。
- 使用 scientific-critical-thinking 审核主张与证据边界；scientific-visualization 只为真实数据制作图表；jupyter-notebook 用于可复现分析；sales-enablement 仅用于合作与销售材料。
- WCAG 对比度门槛：正常文字至少 4.5:1，大字至少 3:1。大字指 18pt 常规或 14pt 粗体（约 24px / 18.67px；CJK 使用等效尺寸），不能把 18px / 14px 当作通用大字阈值。
