import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';
import { chromium } from '@playwright/test';

const origin = process.env.SITE_URL ?? 'http://localhost:4325/yangpenghan/';
const output = 'artifacts/visual-refresh/explore';
const phases = ['intro', 'question', 'before', 'during', 'after', 'delivery', 'synthesis', 'paths'];
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const errors = [];
let audits = 0;
async function openScene(page, phase) {
	await page.evaluate((hash) => {
		location.hash = hash;
	}, phase);
	await page.locator(`#${phase}:visible`).waitFor();
	if (phase === 'question') {
		await page.locator('[data-choice="self-report"]').click();
		await page.locator('[data-fold-all]').click();
	}
	if (phase === 'before' || phase === 'during') await page.locator(`[data-observe="${phase}"]`).click();
	if (phase === 'delivery' && (await page.locator('[data-open-evidence]').isVisible()))
		await page.locator('[data-open-evidence]').click();
	await page.evaluate(() => {
		document.activeElement?.blur();
		scrollTo(0, 0);
	});
	await page.waitForTimeout(1000);
}
try {
	for (const locale of ['zh', 'en']) {
		const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
		const page = await context.newPage();
		page.on('pageerror', (e) => errors.push(e.message));
		const url = `${origin + (locale === 'en' ? 'en/' : '')}explore/`;
		await page.goto(url);
		await page.locator('.cinema-ready').waitFor();
		assert.equal(await page.locator('[data-scene]:visible').count(), 1);
		await page.locator('.cup-entry').click();
		assert.equal(await page.locator('[data-question-unfold]').isVisible(), false);
		await page.locator('[data-choice="self-report"]').click();
		assert.equal(await page.locator('[data-question-unfold]').isVisible(), true);
		await page.locator('[data-fold]').focus();
		await page.keyboard.press('End');
		assert.equal(await page.locator('[data-fold-enter]').isVisible(), true);
		assert.equal(await page.locator('.fold-frame[inert]').count(), 0);
		for (const phase of phases) {
			await openScene(page, phase);
			assert.equal(await page.locator('[data-scene]:visible').count(), 1);
			const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
			assert.deepEqual(
				result.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
				[],
				`${locale}/${phase}`,
			);
			audits++;
			await page.screenshot({ path: `${output}/cinema-${locale}-${phase}.png`, fullPage: true });
		}
		await openScene(page, 'after');
		await page.locator('[data-letter="A"]').first().click();
		assert.equal(await page.locator('[data-count]').textContent(), '1 / 5');
		await page.locator('#after [data-help]').click();
		await page.locator('#after details summary').first().click();
		await page.locator('#after [data-method-link]').first().click();
		await page.locator('main [data-story-return]').click();
		await page.locator('#after:visible').waitFor();
		assert.equal(await page.locator('[data-count]').textContent(), '1 / 5');
		assert.equal(await page.locator('[data-fold]').inputValue(), '100');
		await page.reload();
		await page.locator('.cinema-ready').waitFor();
		assert.equal(await page.locator('[data-count]').textContent(), '1 / 5');
		await openScene(page, 'delivery');
		await page.locator('[data-evidence-phase="after"]').click();
		await page.locator('[data-dataset="target-clicks"]').click();
		assert.match(await page.locator('[data-chart-readout]').textContent(), /8.5/);
		await page.reload();
		await page.locator('.cinema-ready').waitFor();
		assert.equal(await page.locator('.cinema-report').isVisible(), true);
		for (const width of [320, 390]) {
			await page.setViewportSize({ width, height: 844 });
			for (const phase of phases) {
				await openScene(page, phase);
				assert.equal(
					await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
					true,
					`${locale}/${phase}/${width}`,
				);
				if (width === 390)
					await page.screenshot({ path: `${output}/cinema-${locale}-${phase}-mobile.png`, fullPage: true });
			}
		}
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await openScene(page, 'during');
		assert.equal(
			await page
				.locator('.during-room .cinema-backdrop')
				.evaluate((el) => getComputedStyle(el).animationName),
			'none',
		);
		await page.locator('.exit-link').click();
		assert.match(page.url(), /#selected-work-title$/);
		await context.close();
	}
	const plainContext = await browser.newContext({ javaScriptEnabled: false });
	const plain = await plainContext.newPage();
	await plain.goto(`${origin}explore/`);
	assert.equal(await plain.locator('[data-scene]:visible').count(), 8);
	assert.equal(await plain.locator('[data-story] button:visible').count(), 0);
	assert.equal(await plain.locator('[data-source-table]').count(), 6);
	await plainContext.close();
	const blocked = await browser.newContext();
	await blocked.addInitScript(() => {
		for (const name of ['getItem', 'setItem'])
			Object.defineProperty(Storage.prototype, name, {
				value() {
					throw new Error('Storage disabled');
				},
			});
	});
	const restricted = await blocked.newPage();
	restricted.on('pageerror', (e) => errors.push(e.message));
	await restricted.goto(`${origin}explore/#before`);
	await restricted.locator('.cinema-ready').waitFor();
	await restricted.locator('[data-observe="before"]').click();
	assert.equal(await restricted.locator('[data-observation="before"]').isVisible(), true);
	await blocked.close();
	assert.deepEqual(errors, []);
	console.log(
		JSON.stringify(
			{
				scenes: 16,
				accessibilityAudits: audits,
				browserErrors: 0,
				mobileWidths: [320, 390],
				checks: [
					'cup entry',
					'verdict reveal',
					'keyboard timeline',
					'hotspots',
					'method return',
					'task state',
					'fold persistence',
					'report persistence',
					'actual data',
					'reduced motion',
					'no JavaScript',
					'disabled storage',
					'skip exit',
				],
				screenshots: output,
			},
			null,
			2,
		),
	);
} finally {
	await browser.close();
}
