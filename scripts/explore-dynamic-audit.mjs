import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const origin = process.env.SITE_URL ?? 'http://localhost:4325/yangpenghan/';
try {
	const context = await browser.newContext();
	await context.addInitScript(() => {
		const Native = window.AudioContext;
		window.AudioContext = class extends Native {
			constructor(...args) {
				super(...args);
				window.testAudio = this;
				const meter = this.createAnalyser();
				meter.fftSize = 2048;
				window.testMeter = meter;
				const createGain = this.createGain.bind(this);
				this.createGain = () => {
					const gain = createGain();
					const connect = gain.connect.bind(gain);
					gain.connect = (destination, ...rest) => {
						if (destination === this.destination) connect(meter);
						return connect(destination, ...rest);
					};
					return gain;
				};
			}
		};
	});
	const page = await context.newPage();
	const errors = [];
	page.on('pageerror', (e) => errors.push(e.message));
	await page.goto(`${origin}explore/`);
	await page.locator('.story-ready').waitFor();

	await page.locator('.cup-entry').click();
	await page.locator('[data-choice="sleep-duration"]').click();
	await page.locator('[data-fold-all]').click();
	await page.locator('[data-fold-enter]').click();
	await page.locator('[data-observe="before"]').click();
	assert.equal(await page.locator('[data-observation="before"]').isVisible(), true);
	await page.evaluate(() => {
		location.hash = 'delivery';
	});
	await page.locator('#delivery:visible').waitFor();
	await page.locator('[data-open-evidence]').click();
	await page.waitForTimeout(200);
	assert.equal(
		await page.locator('[data-report-svg]').evaluate((el) => el.getAnimations({ subtree: true }).length > 0),
		true,
	);
	await page.locator('[data-evidence-phase="after"]').click();
	assert.equal(
		await page
			.locator('.plot-bar')
			.first()
			.evaluate((el) => el.getAnimations().length > 0),
		true,
	);
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.locator('[data-evidence-phase="before"]').click();
	assert.equal(
		await page.locator('[data-report-svg]').evaluate((el) => el.getAnimations({ subtree: true }).length),
		0,
	);
	const sound = page.locator('[data-sound-toggle]');
	assert.equal(await sound.getAttribute('aria-pressed'), 'true');
	await sound.click();
	await page.waitForFunction(() => window.testAudio?.state === 'suspended');
	await sound.click();
	await page.waitForFunction(() => window.testAudio?.state === 'running');
	assert.equal(await sound.getAttribute('aria-pressed'), 'true');
	await page.waitForTimeout(700);
	const rms = () =>
		page.evaluate(() => {
			const samples = new Float32Array(window.testMeter.fftSize);
			window.testMeter.getFloatTimeDomainData(samples);
			return Math.sqrt(samples.reduce((sum, value) => sum + value * value, 0) / samples.length);
		});
	const audibleRms = await rms();
	assert.ok(audibleRms > 0.01, `Expected audible output, got RMS ${audibleRms}`);
	console.log(`Default audio RMS after 700ms: ${audibleRms.toFixed(4)}`);
	await page.locator('[data-sound] summary').click();
	await page.locator('[data-sound-volume]').fill('0');
	await page.waitForTimeout(1200);
	assert.ok((await rms()) < 0.001, 'Zero volume must silence actual output');
	await page.locator('[data-sound-volume]').fill('45');
	await sound.click();
	await page.waitForFunction(() => window.testAudio?.state === 'suspended');
	await sound.click();
	await page.waitForFunction(() => window.testAudio?.state === 'running');
	await page.evaluate(() => window.dispatchEvent(new Event('pagehide')));
	await page.waitForFunction(() => window.testAudio?.state === 'suspended');
	assert.equal(await sound.getAttribute('aria-pressed'), 'false');
	assert.deepEqual(errors, []);
	console.log(
		'PASS: cinematic entry, verdict timeline, observation hotspot, persistent line/bar animation, reduced motion, real AudioContext start/stop/restart, volume and pagehide cleanup.',
	);
	await context.close();
} finally {
	await browser.close();
}
