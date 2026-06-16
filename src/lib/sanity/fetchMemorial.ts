import type { MemorialPage, MemorialPhoto, Tribute } from '../../types/memorial';
import { getSanityClient } from './client';
import { MEMORIAL_PAGE_ID, approvedTributesQuery, memorialPageQuery, memorialPhotosQuery } from './queries';
import { mapSanityMemorialPage } from './mapMemorialPage';
import { urlForImage } from './image';
import type { SanityMemorialPageDoc, SanityMemorialPhotoDoc, SanityTributeDoc } from '../../types/memorial';

export async function fetchMemorialPageFromSanity(): Promise<MemorialPage | null> {
	const client = getSanityClient();
	const doc = await client.fetch<SanityMemorialPageDoc | null>(memorialPageQuery, {
		id: MEMORIAL_PAGE_ID,
	});
	return mapSanityMemorialPage(doc);
}

export async function fetchApprovedTributesFromSanity(): Promise<Tribute[]> {
	const client = getSanityClient();
	const docs = await client.fetch<SanityTributeDoc[]>(approvedTributesQuery);
	return docs.map((doc) => ({
		id: doc._id,
		authorName: doc.authorName,
		relationship: doc.relationship?.trim() || undefined,
		message: doc.message,
		submittedAt: doc.submittedAt,
	}));
}

export async function fetchMemorialPhotosFromSanity(): Promise<MemorialPhoto[]> {
	const client = getSanityClient();
	const docs = await client.fetch<SanityMemorialPhotoDoc[]>(memorialPhotosQuery);
	return docs
		.filter((doc) => doc.image?.asset)
		.map((doc) => ({
			id: doc._id,
			src: urlForImage(doc.image),
			alt: doc.image?.alt?.trim() || doc.caption?.trim() || 'Memorial photo',
			caption: doc.caption?.trim() || undefined,
		}));
}
