import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const portraitPath = fileURLToPath(new URL('../public/assets/portrait.jpg', import.meta.url));
const portrait = await readFile(portraitPath);
const portraitUrl = `data:image/jpeg;base64,${portrait.toString('base64')}`;
const brandRoot = new URL('../public/assets/brand/', import.meta.url);
const mark = await readFile(new URL('logos/open-inference.svg', brandRoot));
const markUrl = `data:image/svg+xml;base64,${mark.toString('base64')}`;
const latin = await readFile(new URL('fonts/technical/IBMPlexSans.woff2', brandRoot));
const chinese = await readFile(new URL('fonts/technical/NotoSansSC-site.woff2', brandRoot));
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
		eyebrow: '独立的问题解决专家',
		titleA: '所有问题',
		titleB: '都是技术性问题。',
		footer: '拆解目标与条件，用可及的工具找到解法。',
	},
	{
		locale: 'en',
		name: 'Will Yang',
		alternate: '杨朋翰',
		eyebrow: 'INDEPENDENT PROBLEM SOLVER',
		titleA: 'Every problem',
		titleB: 'is a technical problem.',
		footer: 'Reframe the question. Work with what is available.',
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
@font-face { font-family: "Will Display"; src: url(data:font/woff2;base64,${latin.toString('base64')}) format("woff2"); font-weight: 100 700; }
@font-face { font-family: "Will Text"; src: url(data:font/woff2;base64,${chinese.toString('base64')}) format("woff2"); font-weight: 100 900; }
* { box-sizing: border-box; }
html, body { width: 1200px; height: 630px; margin: 0; overflow: hidden; }
body {
	position: relative;
	background: #f4f6f8;
 color: #17232e;
 font-family: "Will Display", "Will Text", sans-serif;
}
.identity { position: absolute; top: 42px; left: 56px; display: flex; align-items: center; gap: 14px; }
.mark { display: grid; width: 48px; height: 48px; place-items: center;   }
.name { display: grid; line-height: 1.05; }
.name strong { font-size: 20px; }
.name span { color: #536475; font-size: 12px; }
.eyebrow { position: absolute; top: 148px; left: 56px; color: #433c53; font-size: 14px; font-weight: 500; letter-spacing: .08em; }
.eyebrow::before { display: inline-block; width: 28px; height: 1px; margin: 0 14px 4px 0; background: currentColor; content: ""; }
h1 {
	position: absolute;
	top: 202px;
	left: 56px;
	width: 760px;
	margin: 0;
	font-family: "Will Display", "Will Text", sans-serif;
	font-size: ${cover.locale === 'zh' ? '64px' : '52px'};
	font-weight: 600;
	letter-spacing: -.025em;
	line-height: 1.35;
}
h1 span { display: block; }
h1 span:last-child { margin-left: 0; color: #433c53; }
.portrait { position: absolute; top: 72px; right: 56px; width: 280px; height: 472px; padding: 10px; border: 1px solid #536475; background: #e7ecf1; }
.portrait img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.78) contrast(1.04); }

.footer { position: absolute; left: 56px; bottom: 42px; color: #536475; font-size: 13px; letter-spacing: .04em; }
.issue { position: absolute; right: 56px; bottom: 42px; color: #536475; font-size: 11px; }
</style>
</head>
<body>
	<div class="identity"><img class="mark" src="${markUrl}" alt=""><span class="name"><strong>${escapeHtml(cover.name)}</strong><span>${escapeHtml(cover.alternate)}</span></span></div>
	<p class="eyebrow">${escapeHtml(cover.eyebrow)}</p>
	<h1><span>${escapeHtml(cover.titleA)}</span><span>${escapeHtml(cover.titleB)}</span></h1>
	<div class="portrait"><img src="${portraitUrl}" alt=""></div>
	<p class="footer">${escapeHtml(cover.footer)}</p>
	<p class="issue">WILL YANG / 2026</p>
</body>
</html>`;
}

for (const cover of covers) {
	const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
	await page.setContent(renderCover(cover), { waitUntil: 'load' });
	await page.evaluate(() => document.fonts.ready);
	await page.screenshot({
		path: fileURLToPath(new URL(`../public/assets/og-cover-${cover.locale}.png`, import.meta.url)),
	});
	await page.close();
}

await browser.close();
