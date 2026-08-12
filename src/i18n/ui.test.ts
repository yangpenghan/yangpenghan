import { describe, expect, it } from 'vitest';
import { defaultLocale, languages, ui } from './ui';

describe('translation catalog', () => {
	it('keeps every locale aligned with the default locale', () => {
		const expectedKeys = Object.keys(ui[defaultLocale]).sort();

		for (const locale of Object.keys(languages) as Array<keyof typeof languages>) {
			expect(Object.keys(ui[locale]).sort()).toEqual(expectedKeys);
		}
	});

	it('does not ship empty translation values', () => {
		for (const catalog of Object.values(ui)) {
			for (const value of Object.values(catalog)) {
				expect(value.trim()).not.toBe('');
			}
		}
	});
});
