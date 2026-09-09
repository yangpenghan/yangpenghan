import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';
import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const output = 'artifacts/visual-refresh/measurement';
await mkdir(output, { recursive: true });
const errors = [];
let checks = 0;
try {
	for (const locale of ['zh', 'en']) {
		for (const width of [390, 1440]) {
			const context = await browser.newContext({ viewport: { width, height: 1000 } });
			const page = await context.newPage();
			page.on('pageerror', (e) => errors.push(e.message));
			await page.goto(`http://localhost:4325/yangpenghan/${locale === 'en' ? 'en/' : ''}explore/#before`);
			await page.locator('.cinema-ready').waitFor();
			for (const [kind, phase] of [
				['face', 'before'],
				['eeg', 'during'],
				['emg', 'during'],
				['eye', 'after'],
			]) {
				await page.evaluate((hash) => (location.hash = hash), phase);
				const hotspot = page.locator(`[data-observe="${phase}"]`);
				if (await hotspot.count()) await hotspot.click();
				const panel = page.locator(`[data-measurement="${kind}"]`);
				await panel.locator('summary').click();
				await panel.locator('img').evaluate((e) => e.decode());
				assert.equal(await panel.locator('img').evaluate((e) => e.naturalWidth > 0), true);
				for (const step of [1, 2, 3]) {
					await panel.locator(`[data-measure-step="${step}"]`).click();
					assert.equal(await panel.getAttribute('data-step'), String(step));
					assert.equal(await panel.locator('[data-measure-copy]:visible').count(), 1);
					for (const layer of [2, 3])
						assert.equal(await panel.locator(`.layer-${layer}`).isVisible(), step >= layer);
				}
				await page.waitForTimeout(2300);
				const result = await new AxeBuilder({ page })
					.include(`[data-measurement="${kind}"]`)
					.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
					.analyze();
				assert.deepEqual(
					result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
					[],
				);
				assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
				await panel.screenshot({ path: `${output}/${locale}-${kind}-${width}.png` });
				checks++;
			}
			await page.emulateMedia({ reducedMotion: 'reduce' });
			const animation = await page
				.locator('[data-measurement="eye"] .measure-line')
				.first()
				.evaluate((e) => getComputedStyle(e).animationName);
			assert.equal(animation, 'none');
			await context.close();
		}
	}
	assert.deepEqual(errors, []);
	console.log(
		JSON.stringify(
			{
				measurementAudits: checks,
				browserErrors: errors.length,
				checks: [
					'three-step reveal',
					'single explanation',
					'image loaded',
					'desktop/mobile overflow',
					'WCAG AA',
					'reduced motion',
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
