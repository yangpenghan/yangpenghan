import assert from 'node:assert/strict';
import AxeBuilder from '@axe-core/playwright';
import { chromium } from '@playwright/test';

const siteUrl = new URL(process.env.SITE_URL ?? 'http://localhost:4321/yangpenghan/');
const launchOptions = {
	headless: true,
	args: ['--disable-extensions'],
};
if (process.env.CHROME_PATH) launchOptions.executablePath = process.env.CHROME_PATH;
const browser = await chromium.launch(launchOptions);

const browserErrors = [];
const badRoutes = [];
const queue = [siteUrl.href];
const seen = new Set();
const checkedDocuments = new Set();
const idsByRoute = new Map();
const fragmentTargets = [];
const crawlContext = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const crawlPage = await crawlContext.newPage();

crawlPage.on('console', (message) => {
	if (message.type() === 'error') browserErrors.push(`console: ${message.text()}`);
});
crawlPage.on('pageerror', (error) => browserErrors.push(`page: ${error.message}`));

while (queue.length > 0) {
	const url = queue.shift();
	if (!url || seen.has(url)) continue;
	seen.add(url);

	const response = await crawlPage.goto(url, { waitUntil: 'domcontentloaded' });
	const status = response?.status() ?? 0;
	if (status === 0 || status >= 400) badRoutes.push({ url, status });
	idsByRoute.set(
		url,
		new Set(await crawlPage.locator('[id]').evaluateAll((nodes) => nodes.map((node) => node.id))),
	);

	const hrefs = await crawlPage.locator('a[href]').evaluateAll((nodes) =>
		nodes.map((node) => {
			if (!(node instanceof HTMLAnchorElement)) return '';
			return node.href;
		}),
	);

	for (const href of hrefs) {
		if (!href) continue;
		const candidate = new URL(href);
		const fragment = candidate.hash;
		candidate.hash = '';
		if (candidate.origin !== siteUrl.origin || !candidate.pathname.startsWith(siteUrl.pathname)) continue;
		// Validate downloads without opening Chrome's PDF viewer, which requests a root favicon.
		if (candidate.pathname.toLowerCase().endsWith('.pdf')) {
			if (!checkedDocuments.has(candidate.href)) {
				checkedDocuments.add(candidate.href);
				const document = await crawlContext.request.get(candidate.href);
				assert.equal(document.status(), 200, `Document must load: ${candidate.href}`);
				assert.ok(document.headers()['content-type']?.includes('application/pdf'));
				assert.equal((await document.body()).subarray(0, 5).toString(), '%PDF-');
			}
			continue;
		}
		if (/\.(md|csv|jpg)$/i.test(candidate.pathname)) {
			if (!checkedDocuments.has(candidate.href)) {
				checkedDocuments.add(candidate.href);
				const document = await crawlContext.request.get(candidate.href);
				assert.equal(document.status(), 200, `Download must load: ${candidate.href}`);
				assert.ok(
					!document.headers()['content-type']?.includes('text/html'),
					'Download must not be an HTML fallback',
				);
				const body = await document.body();
				assert.ok(body.length > 0, 'Download must not be empty');
				if (candidate.pathname.endsWith('.jpg')) assert.equal(body.subarray(0, 2).toString('hex'), 'ffd8');
				else assert.ok(!body.toString().trimStart().toLowerCase().startsWith('<!doctype html'));
			}
			continue;
		}
		if (fragment) {
			fragmentTargets.push({ from: url, to: candidate.href, id: decodeURIComponent(fragment.slice(1)) });
		}
		if (!seen.has(candidate.href) && !queue.includes(candidate.href)) queue.push(candidate.href);
	}
}

await crawlContext.close();
assert.deepEqual(badRoutes, [], 'Internal routes must return a successful status');
assert.deepEqual(browserErrors, [], 'Pages must not emit browser errors');
const brokenFragments = fragmentTargets.filter((target) => !idsByRoute.get(target.to)?.has(target.id));
assert.deepEqual(brokenFragments, [], 'Internal links and article contents must target existing section IDs');

const accessibilityTargets = [
	['', 1440, 'light'],
	['work/', 1440, 'light'],
	['work/medical-devices/', 1440, 'light'],
	['work/financial-behavior-model/', 1440, 'light'],
	['method/', 1440, 'light'],
	['notes/', 1440, 'light'],
	['notes/', 390, 'light'],
	['en/notes/', 1440, 'dark'],
	['notes/behavior-labels-and-meaning/', 390, 'light'],
	['en/notes/automation-and-human-burden/', 1440, 'dark'],
	['notes/issue-lists-expire/', 1440, 'light'],
	['notes/every-problem-is-technical/', 390, 'light'],
	['en/notes/every-problem-is-technical/', 1440, 'dark'],
	['about/', 1440, 'light'],
	['en/', 1440, 'dark'],
	['en/work/medical-devices/', 1440, 'dark'],
	['en/method/', 1440, 'dark'],
	['en/notes/agents-need-workflows/', 1440, 'dark'],
	['en/about/', 1440, 'dark'],
	['', 390, 'light'],
	['work/medical-devices/', 390, 'light'],
	['method/', 390, 'light'],
	['notes/agents-need-workflows/', 390, 'light'],
	['en/about/', 390, 'dark'],
];

const accessibilityViolations = [];
for (const [path, width, colorScheme] of accessibilityTargets) {
	if (typeof path !== 'string' || typeof width !== 'number') continue;
	if (colorScheme !== 'light' && colorScheme !== 'dark') continue;

	const context = await browser.newContext({
		viewport: { width, height: width === 390 ? 844 : 1000 },
		colorScheme,
	});
	const page = await context.newPage();
	await page.goto(new URL(path, siteUrl).href, { waitUntil: 'networkidle' });
	const result = await new AxeBuilder({ page }).analyze();
	if (result.violations.length > 0) {
		accessibilityViolations.push({
			path,
			width,
			violations: result.violations.map((violation) => violation.id),
		});
	}
	await context.close();
}

assert.deepEqual(accessibilityViolations, [], 'Representative pages must pass axe-core');

const mobileContext = await browser.newContext({
	viewport: { width: 390, height: 844 },
	colorScheme: 'light',
});
const mobilePage = await mobileContext.newPage();
await mobilePage.goto(siteUrl.href, { waitUntil: 'networkidle' });
const brandResult = await mobilePage.evaluate(async () => {
	await document.fonts.ready;
	const logo = document.querySelector('.brand-mobile .brand-identity img.light');
	return {
		latin: document.fonts.check('500 20px "Will Display"', 'Will Yang'),
		chinese: document.fonts.check('400 20px "Will Text"', '所有问题都是技术性问题'),
		loadedFamilies: [...document.fonts].filter((font) => font.status === 'loaded').map((font) => font.family),
		background: getComputedStyle(document.body).backgroundColor,
		logoLoaded: logo instanceof HTMLImageElement && logo.naturalWidth > 0,
	};
});
assert.equal(brandResult.latin, true);
assert.equal(brandResult.chinese, true);
assert.ok(brandResult.loadedFamilies.includes('Will Display'));
assert.ok(brandResult.loadedFamilies.includes('Will Text'));
assert.ok(
	!brandResult.loadedFamilies.includes('Will Text Complete'),
	'The homepage should only need the small Chinese subset',
);
assert.equal(brandResult.background, 'rgb(244, 246, 248)');
assert.equal(brandResult.logoLoaded, true);
await mobilePage.locator('theme-toggle button').click();

const mobileResult = await mobilePage.evaluate(() => {
	const nav = document.querySelector('.nav-links');
	assertElement(nav);
	const rect = nav.getBoundingClientRect();
	return {
		dark: document.documentElement.classList.contains('theme-dark'),
		savedTheme: localStorage.getItem('theme'),
		navBottom: Math.round(window.innerHeight - rect.bottom),
		navLinks: nav.querySelectorAll('a').length,
	};

	function assertElement(value) {
		if (!(value instanceof HTMLElement)) throw new Error('Expected an HTML element');
	}
});

assert.equal(mobileResult.dark, true);
assert.equal(mobileResult.savedTheme, 'dark');
assert.equal(mobileResult.navBottom, 12);
assert.equal(mobileResult.navLinks, 4);
await mobilePage.reload({ waitUntil: 'networkidle' });
assert.equal(
	await mobilePage.evaluate(() => document.documentElement.classList.contains('theme-dark')),
	true,
);
await mobileContext.close();

const narrowContext = await browser.newContext({ viewport: { width: 320, height: 700 } });
const narrowPage = await narrowContext.newPage();
const narrowOverflows = [];
for (const url of seen) {
	await narrowPage.goto(url, { waitUntil: 'load' });
	await narrowPage.evaluate(() => document.fonts.ready);
	const width = await narrowPage.evaluate(() => ({
		client: document.documentElement.clientWidth,
		scroll: document.documentElement.scrollWidth,
	}));
	if (width.scroll > width.client) narrowOverflows.push({ url, ...width });
}
assert.deepEqual(narrowOverflows, [], 'No crawled route may overflow horizontally at 320px');
await narrowContext.close();

const noScriptContext = await browser.newContext({
	viewport: { width: 1280, height: 900 },
	javaScriptEnabled: false,
});
const noScriptPage = await noScriptContext.newPage();
await noScriptPage.goto(siteUrl.href, { waitUntil: 'domcontentloaded' });
const noScriptOpacity = await noScriptPage.evaluate(() => {
	const work = document.querySelector('.work-section');
	const notes = document.querySelector('.notes-section');
	if (!(work instanceof HTMLElement) || !(notes instanceof HTMLElement)) return null;
	return { work: getComputedStyle(work).opacity, notes: getComputedStyle(notes).opacity };
});
assert.deepEqual(noScriptOpacity, { work: '1', notes: '1' });
for (const prefix of ['', 'en/']) {
	await noScriptPage.goto(new URL(`${prefix}notes/`, siteUrl).href, { waitUntil: 'domcontentloaded' });
	assert.equal(await noScriptPage.locator('.reading-path').count(), 4);
	await noScriptPage.goto(new URL(`${prefix}notes/behavior-labels-and-meaning/`, siteUrl).href, {
		waitUntil: 'domcontentloaded',
	});
	assert.equal(
		await noScriptPage.locator('.note-toc a').count(),
		await noScriptPage.locator('article h2').count(),
	);
	assert.equal(await noScriptPage.locator('article').evaluate((node) => getComputedStyle(node).opacity), '1');
}
await noScriptContext.close();

await browser.close();

console.log(
	JSON.stringify(
		{
			crawledRoutes: seen.size,
			checkedDocuments: checkedDocuments.size,
			checkedFragments: fragmentTargets.length,
			brokenFragments: brokenFragments.length,
			browserErrors: browserErrors.length,
			accessibilityTargets: accessibilityTargets.length,
			accessibilityViolations: accessibilityViolations.length,
			mobile: mobileResult,
			brand: brandResult,
			narrowRoutesChecked: seen.size,
			narrowOverflows: narrowOverflows.length,
			noScriptOpacity,
		},
		null,
		2,
	),
);
