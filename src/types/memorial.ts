import type { PortableTextBlock } from '@portabletext/types';
import type { SanityImageSource } from '@sanity/image-url';

export type MemorialPortrait = {
	src: string;
	alt: string;
	width?: number;
	height?: number;
};

export type MemorialPage = {
	headline: string;
	lifeDates: string;
	epitaph: string;
	videoProvider: 'youtube';
	videoId: string;
	portrait: MemorialPortrait;
	obituary: PortableTextBlock[];
	seoDescription: string;
};

export type Tribute = {
	id: string;
	authorName: string;
	relationship?: string;
	message: string;
	submittedAt: string;
};

export type MemorialPhoto = {
	id: string;
	src: string;
	alt: string;
	caption?: string;
};

export type SanityMemorialPageDoc = {
	headline?: string;
	lifeDates?: string;
	epitaph?: string;
	videoProvider?: 'youtube';
	videoId?: string;
	portrait?: {
		asset?: SanityImageSource;
		alt?: string;
	};
	obituary?: PortableTextBlock[];
	seoDescription?: string;
};

export type SanityTributeDoc = {
	_id: string;
	authorName: string;
	relationship?: string;
	message: string;
	submittedAt: string;
};

export type SanityMemorialPhotoDoc = {
	_id: string;
	image?: {
		asset?: SanityImageSource;
		alt?: string;
	};
	caption?: string;
	sortOrder?: number;
};
