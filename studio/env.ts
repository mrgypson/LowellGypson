/** Public Sanity project id — override via SANITY_PROJECT_ID when needed. */
export const SANITY_PROJECT_ID_DEFAULT = 'o3zy5xyj';

export const SANITY_PROJECT_ID = (
	process.env.SANITY_PROJECT_ID ?? SANITY_PROJECT_ID_DEFAULT
).trim();

export const SANITY_DATASET = (process.env.SANITY_DATASET ?? 'production').trim();

export const SANITY_STUDIO_TITLE = (
	process.env.SANITY_STUDIO_TITLE ?? 'Lowell Gypson Memorial'
).trim();

export const SANITY_STUDIO_HOST = (process.env.SANITY_STUDIO_HOST ?? 'lowell-gypson').trim();
