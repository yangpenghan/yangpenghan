// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://yangpenghan.github.io',
	base: '/yangpenghan/',
	integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
	i18n: {
		defaultLocale: 'zh',
		locales: ['zh', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
