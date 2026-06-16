import { defineCliConfig } from 'sanity/cli';
import { SANITY_DATASET, SANITY_PROJECT_ID, SANITY_STUDIO_HOST } from './env';

export default defineCliConfig({
	api: {
		projectId: SANITY_PROJECT_ID,
		dataset: SANITY_DATASET,
	},
	studioHost: SANITY_STUDIO_HOST,
	deployment: {
		appId: 'yg0s5lq8gh6tcc0uize9bcs3',
	},
});
