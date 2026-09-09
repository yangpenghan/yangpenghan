import { describe, expect, it } from 'vitest';
import { methods, previousStage, readStage, stages, targetLetters, translate } from './model';

describe('story navigation and teaching content', () => {
	it('restores a shared scene and safely rejects unknown hashes', () => {
		expect(readStage('#after')).toBe('after');
		expect(readStage('#https://other.test')).toBe('intro');
		expect(readStage('')).toBe('intro');
	});
	it('keeps back navigation inside the story', () => {
		expect(previousStage('intro')).toBe('intro');
		expect(previousStage('delivery')).toBe('after');
	});
	it('gives each method a valid return scene and both languages', () => {
		expect(new Set(methods.map((method) => method.id)).size).toBe(methods.length);
		for (const method of methods) {
			expect(stages).toContain(method.stage);
			expect(translate(method.short, 'zh').length).toBeGreaterThan(20);
			expect(translate(method.short, 'en').length).toBeGreaterThan(20);
		}
	});
	it('provides a finite, legible task with exactly five targets', () => {
		expect(targetLetters).toHaveLength(24);
		expect(targetLetters.filter((letter) => letter === 'A')).toHaveLength(5);
	});
});
