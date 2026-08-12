import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const collections = {
	work: defineCollection({
		loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			status: z.enum(['delivered', 'operating', 'prototype']),
			year: z.string(),
			order: z.number(),
			discipline: z.string(),
			outcome: z.string(),
			role: z.string(),
			tags: z.array(z.string()),
			externalUrl: z.url().optional(),
			confidentiality: z.string().optional(),
			locale: z.enum(['zh', 'en']),
		}),
	}),
	notes: defineCollection({
		loader: glob({ base: './src/content/notes', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			locale: z.enum(['zh', 'en']),
			category: z.enum(['behavioral-intelligence', 'human-factors', 'agentic-ai', 'solution-engineering']),
			categoryLabel: z.string(),
			readingMinutes: z.number().int().positive(),
			featured: z.boolean().default(false),
		}),
	}),
};
