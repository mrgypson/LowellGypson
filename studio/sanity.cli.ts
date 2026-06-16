import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
	api: {
		projectId: process.env.SANITY_PROJECT_ID ?? '',
		dataset: process.env.SANITY_DATASET ?? 'production',
	},
	studioHost: process.env.SANITY_STUDIO_HOST ?? 'lowell-gypson',
	deployment: {
		appId: 'yg0s5lq8gh6tcc0uize9bcs3',
	},
});
