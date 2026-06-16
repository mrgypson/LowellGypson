/**
 * Seeds memorialPage document and uploads portrait to Sanity.
 * Requires SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_WRITE_TOKEN in env.
 *
 * Run from repo root: npm run seed
 */
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const projectId = process.env.SANITY_PROJECT_ID?.trim();
const dataset = process.env.SANITY_DATASET?.trim() || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

if (!projectId || !token) {
	console.error('Set SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before seeding.');
	process.exit(1);
}

const client = createClient({
	projectId,
	dataset,
	apiVersion: '2024-11-21',
	token,
	useCdn: false,
});

const obituary = JSON.parse(
	readFileSync(join(rootDir, 'seed/obituary-blocks.json'), 'utf8'),
);

async function uploadPortrait() {
	const portraitPath = join(rootDir, 'seed/assets/lowell-portrait.jpg');
	const buffer = readFileSync(portraitPath);
	const asset = await client.assets.upload('image', buffer, {
		filename: 'lowell-portrait.jpg',
	});
	return {
		_type: 'image',
		alt: 'Lowell Hunter Gypson III reading at church',
		asset: {
			_type: 'reference',
			_ref: asset._id,
		},
	};
}

async function main() {
	const portrait = await uploadPortrait();

	const doc = {
		_id: 'memorialPage',
		_type: 'memorialPage',
		headline: 'The Life of Lowell Hunter Gypson III',
		lifeDates: 'March 5, 1951 – April 28, 2026',
		epitaph: '"Well done, good and faithful servant."',
		videoProvider: 'youtube',
		videoId: 'G2VFZVTJZgI',
		portrait,
		obituary,
		seoDescription:
			'In memory of Lowell Hunter Gypson III — pastor, husband, father, grandfather, and friend.',
	};

	await client.createOrReplace(doc);
	console.log('Seeded memorialPage with portrait and obituary.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
