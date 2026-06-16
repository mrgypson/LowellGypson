import type { MemorialPage, SanityMemorialPageDoc } from '../../types/memorial';
import { PLACEHOLDER_PORTRAIT_SRC } from './constants';
import { SANITY_IMAGE_MAX_WIDTH_PORTRAIT, urlForImage } from './image';

export function mapSanityMemorialPage(doc: SanityMemorialPageDoc | null): MemorialPage | null {
	if (!doc) return null;

	const portraitSrc = doc.portrait?.asset
		? urlForImage(doc.portrait, SANITY_IMAGE_MAX_WIDTH_PORTRAIT)
		: PLACEHOLDER_PORTRAIT_SRC;

	return {
		headline: doc.headline?.trim() || 'The Life of Lowell Hunter Gypson III',
		lifeDates: doc.lifeDates?.trim() || 'March 5, 1951 – April 28, 2026',
		epitaph: doc.epitaph?.trim() || '"Well done, good and faithful servant."',
		videoProvider: 'youtube',
		videoId: doc.videoId?.trim() || 'G2VFZVTJZgI',
		portrait: {
			src: portraitSrc,
			alt: doc.portrait?.alt?.trim() || 'Lowell Hunter Gypson III, young portrait',
		},
		obituary: doc.obituary ?? [],
		seoDescription:
			doc.seoDescription?.trim() ||
			'In memory of Lowell Hunter Gypson III — pastor, husband, father, and grandfather.',
	};
}
