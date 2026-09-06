import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { noteResources, resources, workResources } from './resources';

const root = new URL('../../', import.meta.url);

describe('public resource integrity', () => {
	it('resolves resource references and their originating cases in both languages', async () => {
		for (const [collection, mapping] of [
			['work', workResources],
			['notes', noteResources],
		] as const) {
			for (const [slug, ids] of Object.entries(mapping)) {
				expect(ids.length).toBeGreaterThan(0);
				for (const locale of ['zh', 'en'] as const) {
					await expect(
						readFile(new URL(`src/content/${collection}/${locale}/${slug}.md`, root), 'utf8'),
					).resolves.toContain('title:');
					for (const id of ids) {
						expect(resources[id].title[locale].trim()).not.toBe('');
						const text = await readFile(new URL(`public/resources/${locale}/${id}.md`, root), 'utf8');
						expect(text).toMatch(
							locale === 'zh' ? /状态：(空白模板|指令示例)/ : /Status: (Blank template|Instruction example)/,
						);
					}
				}
			}
		}
	});

	it('ships a header-only workload CSV matching the documented units, with no example measurements', async () => {
		const files = await Promise.all(
			['zh', 'en'].map((locale) =>
				readFile(new URL(`public/resources/${locale}/agent-workload.csv`, root), 'utf8'),
			),
		);
		expect(files[0]).toBe(files[1]);
		expect(files[0].trim().split('\n')).toHaveLength(1);
		const columns = files[0].trim().split(',');
		expect(new Set(columns).size).toBe(columns.length);
		for (const field of [
			'baseline_human_minutes',
			'setup_human_minutes',
			'supervision_human_minutes',
			'correction_human_minutes',
			'recovery_human_minutes',
			'agent_elapsed_minutes',
			'interruptions_count',
			'accepted',
		])
			expect(columns).toContain(field);
	});

	it('keeps downloadable professional biographies available in both languages', async () => {
		for (const locale of ['zh', 'en']) {
			const text = await readFile(new URL(`public/resources/${locale}/will-yang-bio.md`, root), 'utf8');
			expect(text).toContain('Noldus');
			expect(text).toContain('penghan.yang@noldus.com');
			expect(text).toContain('yangpenghan1988@gmail.com');
		}
	});
});
