import type { MemorialPage, MemorialPhoto, Tribute } from '../../types/memorial';
import obituaryBlocks from '../../../studio/seed/obituary-blocks.json';

export const mockMemorialPage: MemorialPage = {
	headline: 'The Life of Lowell Hunter Gypson III',
	lifeDates: 'March 5, 1951 – April 28, 2026',
	epitaph: '"Well done, good and faithful servant."',
	videoProvider: 'youtube',
	videoId: 'G2VFZVTJZgI',
	portrait: {
		src: '/images/lowell-portrait.jpg',
		alt: 'Lowell Hunter Gypson III, young portrait',
	},
	obituary: obituaryBlocks,
	seoDescription:
		'In memory of Lowell Hunter Gypson III — pastor, husband, father, grandfather, and friend.',
};

export const mockTributes: Tribute[] = [];

export const mockMemorialPhotos: MemorialPhoto[] = [];
