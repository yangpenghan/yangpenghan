import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

for (const policy of ['no-user-gesture-required', 'document-user-activation-required']) {
	const browser = await chromium.launch({ args: [`--autoplay-policy=${policy}`] });
	try {
		for (const gesture of ['click', 'keyboard']) {
			const context = await browser.newContext();
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
			page.setDefaultTimeout(10000);
			const errors = [];
			page.on('pageerror', (e) => errors.push(e.message));
			await page.goto('http://localhost:4325/yangpenghan/explore/#intro');
			await page.locator('.sound-ready').waitFor();
			const toggle = page.locator('[data-sound-toggle]');
			if (policy === 'no-user-gesture-required') {
				await page.waitForFunction(() => window.testAudio?.state === 'running');
				assert.equal(await toggle.getAttribute('aria-pressed'), 'true');
			} else {
				assert.equal(await page.evaluate(() => window.testAudio.state), 'suspended');
				if (gesture === 'click') await page.locator('.cup-entry').click();
				else await page.keyboard.press('Tab');
				await page.waitForFunction(() => window.testAudio?.state === 'running');
				assert.equal(await toggle.getAttribute('aria-pressed'), 'true');
			}
			await toggle.click();
			await page.waitForFunction(() => window.testAudio.state === 'suspended');
			await page.locator('[data-scene]:visible .cinema-kicker').first().click();
			await page.keyboard.press('Tab');
			await page.waitForTimeout(150);
			assert.equal(await page.evaluate(() => window.testAudio.state), 'suspended');
			assert.equal(await toggle.getAttribute('aria-pressed'), 'false');
			await toggle.click();
			await page.waitForFunction(() => window.testAudio.state === 'running');
			await page.evaluate(() => window.dispatchEvent(new Event('pagehide')));
			await page.waitForFunction(() => window.testAudio.state === 'suspended');
			assert.deepEqual(errors, []);
			console.log(`PASS ${policy}, ${gesture}, explicit off stays off, restart, pagehide`);
			await context.close();
		}
	} finally {
		await browser.close();
	}
}
