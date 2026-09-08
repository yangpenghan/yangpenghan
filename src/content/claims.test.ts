import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import claimsJson from './claims.json';
import { type ClaimCheck, validateClaimDocuments } from './claims-validator';

const contentRoot = fileURLToPath(new URL('.', import.meta.url));
const claims = claimsJson as Record<string, ClaimCheck>;

async function loadClaimDocuments(): Promise<Record<string, string>> {
	const paths = new Set(Object.values(claims).flatMap((claim) => Object.values(claim.documents)));
	return Object.fromEntries(
		await Promise.all(
			[...paths].map(async (path) => [path, await readFile(`${contentRoot}/${path}`, 'utf8')] as const),
		),
	);
}

describe('claim evidence guard', () => {
	it('accepts the current protected claims and qualifications in each corresponding document', async () => {
		expect(validateClaimDocuments(claims, await loadClaimDocuments())).toEqual([]);
	});

	it.each([
		{
			name: 'financial issue count 86 → 84',
			claimId: 'financial-research-issues',
			locale: 'zh' as const,
			change: (copy: string) => copy.replaceAll('86', '84'),
		},
		{
			name: 'PsyPhiClaw module count 18 → 20+',
			claimId: 'psyphiclaw-modules',
			locale: 'en' as const,
			change: (copy: string) => copy.replaceAll('18', '20+'),
		},
		{
			name: 'BehaviorLens loses its target qualifier',
			claimId: 'behaviorlens-processing-target',
			locale: 'en' as const,
			change: (copy: string) =>
				copy.replace('Twenty minutes is a processing target.', 'Processing takes twenty minutes.'),
		},
		{
			name: 'BehaviorLens claims proven time savings',
			claimId: 'behaviorlens-processing-target',
			locale: 'zh' as const,
			change: (copy: string) => `${copy}\n已证实节省时间。`,
		},
		{
			name: 'agent system loses its public-data limitation',
			claimId: 'agent-system-efficiency',
			locale: 'en' as const,
			change: (copy: string) => copy.replace('No public efficiency benchmark is available.', ''),
		},
		{
			name: 'medical service count becomes an individual claim',
			claimId: 'medical-service-scope',
			locale: 'zh' as const,
			change: (copy: string) => copy.replace('团队和产品的全部成果不等同于我个人完成。', ''),
		},
	])('rejects mutation: $name', async ({ claimId, locale, change }) => {
		const documents = await loadClaimDocuments();
		const path = claims[claimId].documents[locale];
		documents[path] = change(documents[path]);
		expect(
			validateClaimDocuments(claims, documents).some((error) => error.startsWith(`${claimId} (${locale})`)),
		).toBe(true);
	});
});
