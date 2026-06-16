// @ts-check
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';
import { assertProductionSiteUrl, resolveSiteUrl } from './src/lib/seo/resolveSiteUrl.ts';

const siteUrl = resolveSiteUrl();
assertProductionSiteUrl(siteUrl);

export default defineConfig({
	site: siteUrl,
	adapter: vercel(),
	devToolbar: {
		enabled: false,
	},
});
