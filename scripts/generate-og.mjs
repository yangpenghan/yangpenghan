import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const portraitPath = fileURLToPath(new URL('../public/assets/portrait.jpg', import.meta.url));
const portrait = await readFile(portraitPath);
const portraitUrl = `data:image/jpeg;base64,${portrait.toString('base64')}`;
const executablePath = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';

const browser = await chromium.launch({
	headless: true,
	executablePath,
	args: ['--disable-extensions'],
});

const covers = [
	{
		locale: 'zh',
		name: '杨朋翰',
		alternate: 'Will Yang',
		eyebrow: '行为智能构建者 · 北京',
		titleA: '把人的行为，',
		titleB: '变成可以工作的系统。',
		footer: '行为科学 × 人因工程 × Agentic AI',
	},
	{
		locale: 'en',
		name: 'Will Yang',
		alternate: '杨朋翰',
		eyebrow: 'BEHAVIORAL INTELLIGENCE BUILDER · BEIJING',
		titleA: 'Turn human behavior',
		titleB: 'into working systems.',
		footer: 'Behavioral science × Human factors × Agentic AI',
	},
];

function escapeHtml(value) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}

function renderCover(cover) {
	return `<!doctype html>
<html lang="${cover.locale === 'zh' ? 'zh-CN' : 'en'}">
<head>
<meta charset="utf-8">
<style>
* { box-sizing: border-box; }
html, body { width: 1200px; height: 630px; margin: 0; overflow: hidden; }
body {
	position: relative;
	background:
		repeating-linear-gradient(90deg, transparent 0 131px, rgba(23, 23, 20, .055) 131px 132px),
		#f3f0e8;
	color: #171714;
	font-family: "Helvetica Neue", "Noto Sans CJK SC", "PingFang SC", Arial, sans-serif;
}
.identity { position: absolute; top: 42px; left: 56px; display: flex; align-items: center; gap: 14px; }
.mark { display: grid; width: 48px; height: 48px; place-items: center; border: 1px solid #171714; font: 700 12px monospace; }
.name { display: grid; line-height: 1.05; }
.name strong { font-size: 20px; }
.name span { color: #706e66; font: 12px monospace; }
.eyebrow { position: absolute; top: 148px; left: 56px; color: #a92e20; font: 700 14px monospace; letter-spacing: .08em; }
.eyebrow::before { display: inline-block; width: 28px; height: 1px; margin: 0 14px 4px 0; background: currentColor; content: ""; }
h1 {
	position: absolute;
	top: 202px;
	left: 56px;
	width: 760px;
	margin: 0;
	font-family: "Iowan Old Style", Baskerville, "Times New Roman", "Noto Serif CJK SC", "Songti SC", serif;
	font-size: ${cover.locale === 'zh' ? '68px' : '82px'};
	font-weight: 600;
	letter-spacing: -.055em;
	line-height: .98;
}
h1 span { display: block; }
h1 span:last-child { margin-left: ${cover.locale === 'zh' ? '55px' : '80px'}; color: #b52f20; }
.portrait { position: absolute; top: 72px; right: 56px; width: 280px; height: 472px; padding: 10px; border: 1px solid #807e75; background: #d9d4c9; }
.portrait img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.78) contrast(1.04); }
.portrait::after { position: absolute; right: -10px; bottom: -10px; width: 20px; height: 20px; background: #d7442f; content: ""; }
.footer { position: absolute; left: 56px; bottom: 42px; color: #5b5a53; font: 700 13px monospace; letter-spacing: .04em; }
.issue { position: absolute; right: 56px; bottom: 42px; color: #807e75; font: 11px monospace; }
</style>
</head>
<body>
	<div class="identity"><span class="mark">WY</span><span class="name"><strong>${escapeHtml(cover.name)}</strong><span>${escapeHtml(cover.alternate)}</span></span></div>
	<p class="eyebrow">${escapeHtml(cover.eyebrow)}</p>
	<h1><span>${escapeHtml(cover.titleA)}</span><span>${escapeHtml(cover.titleB)}</span></h1>
	<div class="portrait"><img src="${portraitUrl}" alt=""></div>
	<p class="footer">${escapeHtml(cover.footer)}</p>
	<p class="issue">FIELD ARCHIVE / 2026</p>
</body>
</html>`;
}

for (const cover of covers) {
	const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
	await page.setContent(renderCover(cover), { waitUntil: 'load' });
	await page.screenshot({
		path: fileURLToPath(new URL(`../public/assets/og-cover-${cover.locale}.png`, import.meta.url)),
	});
	await page.close();
}

await browser.close();
