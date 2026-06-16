import { mockMemorialPage, mockMemorialPhotos, mockTributes } from '../data/mock/memorial';
import type { MemorialPage, MemorialPhoto, Tribute } from '../types/memorial';
import {
	fetchApprovedTributesFromSanity,
	fetchMemorialPageFromSanity,
	fetchMemorialPhotosFromSanity,
} from './sanity/fetchMemorial';

export async function getMemorialPage(): Promise<MemorialPage> {
	if (import.meta.env.SANITY_USE_MOCK === 'true') {
		return mockMemorialPage;
	}
	try {
		const page = await fetchMemorialPageFromSanity();
		if (page) return page;
	} catch (err) {
		console.warn('[content] Sanity memorial fetch failed; using mock.', err);
	}
	return mockMemorialPage;
}

export async function getApprovedTributes(): Promise<Tribute[]> {
	if (import.meta.env.SANITY_USE_MOCK === 'true') {
		return mockTributes;
	}
	try {
		return await fetchApprovedTributesFromSanity();
	} catch (err) {
		console.warn('[content] Sanity tributes fetch failed.', err);
		return [];
	}
}

export async function getMemorialPhotos(): Promise<MemorialPhoto[]> {
	if (import.meta.env.SANITY_USE_MOCK === 'true') {
		return mockMemorialPhotos;
	}
	try {
		return await fetchMemorialPhotosFromSanity();
	} catch (err) {
		console.warn('[content] Sanity photos fetch failed.', err);
		return [];
	}
}
