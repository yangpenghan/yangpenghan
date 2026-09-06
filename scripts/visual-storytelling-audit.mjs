import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';
import { chromium } from '@playwright/test';

const siteUrl = process.env.SITE_URL ?? 'http://localhost:4321/yangpenghan/';
const browser = await chromium.launch({
	executablePath: process.env.CHROME_PATH ?? '/usr/bin/google-chrome',
	headless: true,
});
const results = [];
await mkdir('artifacts/visual-refresh', { recursive: true });
try {
	for (const locale of ['zh', 'en']) {
		for (const width of [1440, 390]) {
			const prefix = locale === 'zh' ? '' : 'en/';
			const context = await browser.newContext({
				viewport: { width, height: 900 },
				colorScheme: locale === 'zh' ? 'light' : 'dark',
				reducedMotion: 'reduce',
			});
			const page = await context.newPage();
			const errors = [];
			page.on('pageerror', (error) => errors.push(error.message));
			page.on('response', (response) => {
				if (response.status() >= 400) errors.push(`${response.status()}: ${response.url()}`);
			});
			await page.goto(new URL(prefix, siteUrl).href, { waitUntil: 'networkidle' });
			await page.evaluate(() => document.fonts.ready);
			const heroIntro = await page.locator('.hero-intro > p').boundingBox();
			assert.ok(
				heroIntro && heroIntro.y + heroIntro.height < 844,
				'Claim and explanation must remain on the first screen',
			);
			assert.equal(await page.locator('.project-index.illustrated .case-diagram').count(), 3);
			assert.equal(await page.locator('#toolbox .instrument').count(), 4);
			const explorer = page.locator('reframe-explorer');
			const tabs = explorer.getByRole('tab');
			assert.equal(await tabs.count(), 3);
			for (let index = 0; index < 3; index++) {
				await tabs.nth(index).click();
				assert.equal(await tabs.nth(index).getAttribute('aria-selected'), 'true');
				assert.equal(await explorer.getByRole('tabpanel').count(), 1);
				assert.equal(await explorer.locator('[data-panel]').nth(index).isVisible(), true);
				const axe = await new AxeBuilder({ page }).include('reframe-explorer').analyze();
				assert.deepEqual(
					axe.violations.map((v) => v.id),
					[],
					'Every selected panel must pass accessibility checks',
				);
			}
			await tabs.nth(2).press('ArrowRight');
			assert.equal(await tabs.nth(0).getAttribute('aria-selected'), 'true');
			await tabs.nth(0).press('End');
			assert.equal(await tabs.nth(2).getAttribute('aria-selected'), 'true');
			await tabs.nth(2).press('Home');
			await tabs.nth(0).press('ArrowLeft');
			assert.equal(await tabs.nth(2).getAttribute('aria-selected'), 'true');
			const ids = await page.locator('main [id]').evaluateAll((nodes) => nodes.map((node) => node.id));
			assert.equal(new Set(ids).size, ids.length, 'Diagram and tab IDs must be unique');
			await tabs.nth(0).click();
			await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });
			await explorer.screenshot({
				animations: 'disabled',
				style: 'astro-dev-toolbar, .masthead, .skip-link { visibility: hidden !important; }',
				path: `artifacts/visual-refresh/visual-explorer-${locale}-${width}.png`,
			});
			await page.evaluate(() => window.scrollTo(0, 0));
			await page.screenshot({
				animations: 'disabled',
				path: `artifacts/visual-refresh/visual-home-${locale}-${width}.png`,
			});
			if (width === 1440) {
				await page.locator('.work-section').screenshot({
					animations: 'disabled',
					style: 'astro-dev-toolbar, .masthead, .skip-link { visibility: hidden !important; }',
					path: `artifacts/visual-refresh/visual-cases-${locale}.png`,
				});
				await page.locator('#toolbox').screenshot({
					animations: 'disabled',
					style: 'astro-dev-toolbar, .masthead, .skip-link { visibility: hidden !important; }',
					path: `artifacts/visual-refresh/visual-toolbox-${locale}.png`,
				});
			}
			await page.goto(new URL(`${prefix}notes/`, siteUrl).href, { waitUntil: 'networkidle' });
			for (const link of await page.locator('.topic-map a').all()) {
				const href = await link.getAttribute('href');
				assert.ok(href?.startsWith('#'));
				assert.equal(await page.locator(href).count(), 1, 'Every topic link needs a destination');
			}
			await page.locator('.foundation').screenshot({
				animations: 'disabled',
				style: 'astro-dev-toolbar, .masthead, .skip-link { visibility: hidden !important; }',
				path: `artifacts/visual-refresh/visual-topics-${locale}-${width}.png`,
			});
			await page.goto(new URL(`${prefix}work/medical-devices/`, siteUrl).href, { waitUntil: 'networkidle' });
			const source = page.locator('.public-slide');
			await source.scrollIntoViewIfNeeded();
			await page.waitForFunction(() => {
				const image = document.querySelector('.public-slide img');
				return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0;
			});
			assert.equal(await source.locator('img').evaluate((image) => image.naturalWidth), 1440);
			assert.ok((await source.locator('a').getAttribute('href'))?.endsWith('.pdf#page=20'));
			await source.screenshot({
				animations: 'disabled',
				style: 'astro-dev-toolbar, .masthead, .skip-link { visibility: hidden !important; }',
				path: `artifacts/visual-refresh/visual-source-${locale}-${width}.png`,
			});
			assert.deepEqual(errors, []);
			results.push({
				locale,
				width,
				panels: 3,
				keyboard: true,
				uniqueIds: true,
				topics: 4,
				sourcePreview: true,
				browserErrors: errors.length,
			});
			await context.close();
		}
	}
	const noScript = await browser.newContext({
		javaScriptEnabled: false,
		viewport: { width: 390, height: 844 },
	});
	const page = await noScript.newPage();
	await page.goto(siteUrl, { waitUntil: 'load' });
	assert.equal(await page.locator('.explorer-controls').isVisible(), false);
	for (const panel of await page.locator('reframe-explorer [data-panel]').all())
		assert.equal(await panel.isVisible(), true);
	await noScript.close();
	console.log(JSON.stringify({ scenarios: results, noScriptAllThreePanelsVisible: true }, null, 2));
} finally {
	await browser.close();
}
