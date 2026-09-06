import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { getRelatedNoteSlugs, readingPaths } from '../i18n/reading-paths';

const contentRoot = fileURLToPath(new URL('.', import.meta.url));

async function slugs(collection: 'work' | 'notes', locale: 'zh' | 'en'): Promise<string[]> {
	return (await readdir(`${contentRoot}/${collection}/${locale}`))
		.filter((name) => name.endsWith('.md'))
		.sort();
}

async function collectionCopy(collection: 'work' | 'notes'): Promise<string> {
	const files = await Promise.all(
		(['zh', 'en'] as const).flatMap(async (locale) => {
			const names = await slugs(collection, locale);
			return Promise.all(
				names.map((name) => readFile(`${contentRoot}/${collection}/${locale}/${name}`, 'utf8')),
			);
		}),
	);
	return files.flat().join('\n');
}

describe('bilingual content archive', () => {
	it('keeps work and note slugs paired across locales', async () => {
		const [zhWork, enWork, zhNotes, enNotes] = await Promise.all([
			slugs('work', 'zh'),
			slugs('work', 'en'),
			slugs('notes', 'zh'),
			slugs('notes', 'en'),
		]);

		expect(zhWork).toEqual(enWork);
		expect(zhNotes).toEqual(enNotes);
		expect(zhWork).toHaveLength(10);
		expect(zhNotes).toHaveLength(22);
	});

	it('resolves every reading path in both languages without duplicate entries', async () => {
		for (const locale of ['zh', 'en'] as const) {
			const available = new Set(await slugs('notes', locale));
			for (const path of readingPaths) {
				expect(path.title[locale].trim()).not.toBe('');
				expect(path.description[locale].trim()).not.toBe('');
				expect(new Set(path.slugs).size).toBe(path.slugs.length);
				for (const slug of path.slugs) {
					expect(available.has(`${slug}.md`), `${locale}/${slug}`).toBe(true);
				}
			}
		}
	});

	it('continues the argument and wraps without recommending the current article', () => {
		expect(getRelatedNoteSlugs('synthetic-users-from-panel-to-agents')).toEqual([
			'experience-across-time',
			'usability-is-an-engineering-process',
		]);
		expect(getRelatedNoteSlugs('usability-is-an-engineering-process')).toEqual([
			'synthetic-users-from-panel-to-agents',
			'experience-across-time',
		]);
		expect(getRelatedNoteSlugs('an-unknown-article')).toEqual([]);
	});

	it('does not regress corrected public facts', async () => {
		const copy = `${await collectionCopy('work')}\n${await collectionCopy('notes')}`;

		expect(copy).not.toMatch(/84\s*(个问题|issues?)/i);
		expect(copy).not.toMatch(/20\+\s*(个)?\s*(PsyPhiClaw|分析模块|analysis modules?)/i);
		expect(copy).toContain('86 个问题');
		expect(copy).toContain('86 decision-ready issues');
		expect(copy).toContain('18 个行为分析模块');
		expect(copy).toContain('18 behavioral-analysis modules');
	});
});
