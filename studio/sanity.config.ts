import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';

const STUDIO_TITLE = (process.env.SANITY_STUDIO_TITLE ?? 'Lowell Gypson Memorial').trim();
const SANITY_PROJECT_ID = (process.env.SANITY_PROJECT_ID ?? '').trim();
const SANITY_DATASET = (process.env.SANITY_DATASET ?? 'production').trim();

export default defineConfig({
	name: 'default',
	title: STUDIO_TITLE,
	projectId: SANITY_PROJECT_ID,
	dataset: SANITY_DATASET,
	plugins: [structureTool({ structure })],
	schema: {
		types: schemaTypes,
	},
});
