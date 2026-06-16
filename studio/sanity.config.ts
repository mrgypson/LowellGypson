import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { SANITY_DATASET, SANITY_PROJECT_ID, SANITY_STUDIO_TITLE } from './env';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';

export default defineConfig({
	name: 'default',
	title: SANITY_STUDIO_TITLE,
	projectId: SANITY_PROJECT_ID,
	dataset: SANITY_DATASET,
	plugins: [structureTool({ structure })],
	schema: {
		types: schemaTypes,
	},
});
