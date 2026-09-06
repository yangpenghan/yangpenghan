import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const site = new URL(process.env.SITE_URL ?? 'http://localhost:4321/yangpenghan/');
const directory = 'artifacts/visual-refresh/optimization-2026-09-06';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({
	executablePath: process.env.CHROME_PATH ?? '/usr/bin/google-chrome',
	headless: true,
});
const measurements = [];
const checks = [];
const errors = [];
try {
	for (const locale of ['zh', 'en']) {
		const prefix = locale === 'zh' ? '' : 'en/';
		for (const width of [390, 1440]) {
			const context = await browser.newContext({
				viewport: { width, height: width === 390 ? 844 : 1000 },
				colorScheme: locale === 'zh' ? 'light' : 'dark',
				reducedMotion: 'reduce',
			});
			await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: site.origin });
			const page = await context.newPage();
			page.on('pageerror', (error) => errors.push(error.message));
			const visit = async (path) => {
				await page.goto(new URL(`${prefix}${path}`, site).href, { waitUntil: 'networkidle' });
				await page.evaluate(() => document.fonts.ready);
				await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });
			};
			const measure = async (path, selector) => {
				const y = await page
					.locator(selector)
					.first()
					.evaluate((node) => Math.round(node.getBoundingClientRect().top + window.scrollY));
				measurements.push({ locale, width, path, selector, y });
				return y;
			};
			await visit('');
			const contact = await page.locator('.nav-tools .contact-link').boundingBox();
			assert.ok(
				contact && contact.y >= 0 && contact.y + contact.height < 100,
				'Contact is visible in the masthead',
			);
			const heroContact = await page.locator('.hero-actions a[href="#contact"]').boundingBox();
			assert.ok(
				heroContact && heroContact.y + heroContact.height < 844,
				'Home contact action is on the first screen',
			);
			assert.equal(await page.locator('.visitor-paths a').count(), 4);
			await measure('', '.project-main strong');
			await page.screenshot({ path: `${directory}/home-${locale}-${width}.png`, animations: 'disabled' });
			if (width === 390) {
				const diagrams = page.locator('.case-diagram .diagram-mobile');
				assert.equal(await diagrams.count(), 3);
				for (const diagram of await diagrams.all()) {
					assert.equal(await diagram.isVisible(), true);
					assert.ok(
						await diagram
							.locator('span')
							.evaluateAll((nodes) =>
								nodes.every((node) => Number.parseFloat(getComputedStyle(node).fontSize) >= 14),
							),
					);
				}
			}
			await page.locator('.project-index a').first().hover();
			const motion = await page
				.locator('.project-arrow')
				.first()
				.evaluate((node) => ({
					duration: getComputedStyle(node).transitionDuration,
					animations: node.getAnimations().length,
				}));
			assert.equal(motion.duration, '0s');
			assert.equal(motion.animations, 0);
			const copy = page.locator('copy-text').first();
			await copy.locator('button').click();
			await page.waitForFunction(() =>
				/已复制|copied/.test(document.querySelector('copy-text [role="status"]')?.textContent ?? ''),
			);
			assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'penghan.yang@noldus.com');
			await page.evaluate(() => {
				navigator.clipboard.writeText = async () => {
					throw new DOMException('Permission denied', 'NotAllowedError');
				};
			});
			await copy.locator('button').click();
			await page.waitForFunction(() =>
				/手动|manually/.test(document.querySelector('copy-text [role="status"]')?.textContent ?? ''),
			);
			assert.equal(await copy.locator('button').isEnabled(), true);

			await visit('notes/');
			const query = page.locator('#note-query');
			assert.equal(await page.locator('[data-note-search]:visible').count(), 22);
			const indexY = await measure('notes/', '.topic-section .note-list strong');
			assert.ok(indexY < 1000, `Essay index appears early: ${indexY}`);
			await query.fill(locale === 'zh' ? 'Agent' : 'agent');
			const matches = await page.locator('[data-note-search]:visible').count();
			assert.ok(matches > 0 && matches < 22);
			await query.fill('no-such-essay-923048');
			assert.equal(await page.locator('[data-note-search]:visible').count(), 0);
			assert.match(await page.locator('.search-status').innerText(), /没有匹配|No matching/);
			await page.locator('.search-controls button').click();
			assert.equal(await page.locator('[data-note-search]:visible').count(), 22);
			assert.equal(await query.evaluate((node) => node === document.activeElement), true);
			await query.fill('<script>alert(1)</script>');
			assert.equal(await page.locator('[data-note-search]:visible').count(), 0);
			await page.locator('.topic-links a').first().click();
			assert.equal(await query.inputValue(), '');
			assert.equal(await page.locator('[data-note-search]:visible').count(), 22);
			await page.evaluate(() => window.scrollTo(0, 0));
			await page.screenshot({ path: `${directory}/notes-${locale}-${width}.png`, animations: 'disabled' });
			await page.locator('a[href="#reading-paths"]').click();
			assert.equal(await page.locator('.guided-reading').evaluate((node) => node.open), true);

			for (const path of [
				'notes/automation-and-human-burden/',
				'notes/every-problem-is-technical/',
				'work/medical-devices/',
			]) {
				await visit(path);
				const y = await measure(path, '.prose > p');
				assert.ok(y < 1150, `Prose must be substantially earlier than the audit baseline: ${path} ${y}`);
				if (path.startsWith('notes/')) {
					assert.equal(await page.locator('.note-toc').evaluate((node) => node.open), width > 896);
					if (width === 390) await page.locator('.note-toc summary').click();
					await page.locator('.note-toc a').first().click();
					const anchorTop = await page
						.locator(decodeURIComponent(new URL(page.url()).hash))
						.evaluate((node) => node.getBoundingClientRect().top);
					assert.ok(anchorTop > 70, 'Heading is below the sticky masthead');
				}
				await page.evaluate(() => window.scrollTo(0, 0));
				await page.screenshot({
					path: `${directory}/${path.replaceAll('/', '-')}${locale}-${width}.png`,
					animations: 'disabled',
				});
			}
			if (width === 390) {
				await visit('');
				const obscured = [];
				for (let index = 0; index < 65; index++) {
					await page.keyboard.press('Tab');
					const issue = await page.evaluate(() => {
						const element = document.activeElement;
						if (
							!(element instanceof HTMLElement) ||
							element.closest('.masthead, astro-dev-toolbar') ||
							element.classList.contains('skip-link')
						)
							return null;
						const rect = element.getBoundingClientRect();
						const nav = document.querySelector('.nav-links')?.getBoundingClientRect();
						if (!nav || rect.height > 100 || rect.height === 0) return null;
						const overlaps =
							rect.left < nav.right &&
							rect.right > nav.left &&
							rect.top < nav.bottom &&
							rect.bottom > nav.top;
						return overlaps ? element.textContent?.trim() : null;
					});
					if (issue) obscured.push(issue);
				}
				assert.deepEqual(obscured, [], 'Mobile navigation must not obscure focused links or controls');
			}
			for (const target of [
				'toolbox',
				'toolbox-title',
				'home-reframe-panel-0',
				'home-reframe-panel-1',
				'home-reframe-panel-2',
			]) {
				await visit(`#${target}`);
				assert.equal(
					await page.locator(`[id="${target}"]`).count(),
					1,
					'Legacy home anchor remains available',
				);
			}
			for (let index = 0; index < 3; index++) {
				await visit(`method/#method-reframe-panel-${index}`);
				assert.equal(
					await page.locator(`#method-reframe-panel-${index}`).isVisible(),
					true,
					'Linked example is selected on arrival',
				);
				assert.equal(
					await page.locator(`#method-reframe-tab-${index}`).getAttribute('aria-selected'),
					'true',
				);
			}
			checks.push({
				locale,
				width,
				contact: true,
				search: true,
				copySuccessAndFailure: true,
				nativeContents: true,
				reducedMotion: true,
				legacyAnchors: true,
				explorerDeepLinks: true,
			});
			await context.close();
		}
		const noScript = await browser.newContext({
			javaScriptEnabled: false,
			viewport: { width: 390, height: 844 },
		});
		const page = await noScript.newPage();
		await page.goto(new URL(`${prefix}notes/`, site).href);
		assert.equal(await page.locator('[data-note-search]:visible').count(), 22);
		assert.equal(await page.locator('.search-controls').isVisible(), false);
		await page.locator('.guided-reading > summary').click();
		assert.equal(await page.locator('.reading-path:visible').count(), 4);
		await page.goto(new URL(`${prefix}work/medical-devices/`, site).href);
		assert.equal(await page.locator('#materials a[download]').count(), 1);
		assert.equal(await page.locator('copy-text button:visible').count(), 0);
		assert.ok(await page.locator('.email-address').first().innerText());
		await noScript.close();
	}
	assert.deepEqual(errors, []);
	const report = { checks, measurements, noJavaScript: true, browserErrors: errors };
	await writeFile(`${directory}/interaction-report.json`, `${JSON.stringify(report, null, 2)}\n`);
	console.log(JSON.stringify(report, null, 2));
} finally {
	await browser.close();
}
