import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';
import { chromium } from '@playwright/test';

const origin = process.env.SITE_URL ?? 'http://localhost:4325/yangpenghan/';
const browser = await chromium.launch();
await mkdir('artifacts/home-entry', { recursive: true });
try {
	for (const locale of ['zh', 'en'])
		for (const width of [390, 1440]) {
			const context = await browser.newContext({
				viewport: { width, height: 1000 },
				reducedMotion: 'reduce',
			});
			await context.addInitScript(() => {
				const Native = window.AudioContext;
				window.AudioContext = class extends Native {
					constructor(...args) {
						super(...args);
						window.testAudio = this;
					}
				};
			});
			const page = await context.newPage();
			page.setDefaultTimeout(15000);
			const url = origin + (locale === 'en' ? 'en/' : '');
			await page.goto(url);
			await page.locator('.cinema-ready').waitFor();
			assert.equal(await page.locator('.home-intro:visible').count(), 1);
			assert.equal(await page.evaluate(() => window.testAudio === undefined), true);
			assert.equal(
				await page.locator('[data-language]').getAttribute('href'),
				`${origin}${locale === 'zh' ? 'en/' : ''}#intro`,
			);
			assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
			const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
			assert.deepEqual(
				axe.violations.map((v) => v.id),
				[],
			);
			await page.screenshot({ path: `artifacts/home-entry/${locale}-${width}.png`, fullPage: true });
			await page.locator('.home-direct').click();
			await page.locator('#selected-work-title').waitFor();
			assert.ok(page.url().includes('/overview/'));
			await page.goto(url);
			await page.locator('[data-start-story]').click();
			await page.waitForFunction(() => window.testAudio?.state === 'running');
			assert.equal(await page.locator('#question:visible').count(), 1);
			await page.locator('.exit-link').click();
			await page.locator('#selected-work-title').waitFor();
			await page.goto(`${url}#before`);
			await page.locator('[data-observe="before"]').click();
			await page.locator('#before [data-help]').click();
			await page.locator('#before .term-note summary').first().click();
			await page.locator('#before [data-method-link]').first().click();
			await page.locator('[data-story-return]').first().click();
			await page.locator('#before:visible').waitFor();
			assert.equal(new URL(page.url()).pathname, new URL(url).pathname);
			await page.goto(`${url}#contact`);
			await page.waitForURL('**/overview/#contact');
			await page.locator('#contact').waitFor();
			await context.close();
			console.log('PASS home', locale, width);
		}
} finally {
	await browser.close();
}
