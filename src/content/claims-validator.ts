export type Locale = 'zh' | 'en';

export interface ClaimCheck {
	documents: Record<Locale, string>;
	validation: {
		required: Record<Locale, string[]>;
		forbidden: Record<Locale, string[]>;
	};
}

export function validateClaimDocuments(
	claims: Record<string, ClaimCheck>,
	documents: Record<string, string>,
): string[] {
	const errors: string[] = [];
	for (const [claimId, claim] of Object.entries(claims)) {
		for (const locale of ['zh', 'en'] as const) {
			const document = documents[claim.documents[locale]];
			if (document === undefined) {
				errors.push(`${claimId} (${locale}) document is unavailable: ${claim.documents[locale]}`);
				continue;
			}
			for (const required of claim.validation.required[locale]) {
				if (!document.includes(required)) {
					errors.push(`${claimId} (${locale}) is missing required claim text: ${required}`);
				}
			}
			for (const pattern of claim.validation.forbidden[locale]) {
				if (new RegExp(pattern, 'iu').test(document)) {
					errors.push(`${claimId} (${locale}) contains a prohibited inference: ${pattern}`);
				}
			}
		}
	}
	return errors;
}
