import { createClient, type SanityClient } from '@sanity/client';
import {
	SANITY_API_VERSION_DEFAULT,
	SANITY_DATASET_DEFAULT,
	SANITY_PROJECT_ID_DEFAULT,
} from './constants';

function getProjectId(): string {
	return import.meta.env.SANITY_PROJECT_ID ?? SANITY_PROJECT_ID_DEFAULT;
}

function getDataset(): string {
	return import.meta.env.SANITY_DATASET ?? SANITY_DATASET_DEFAULT;
}

function getApiVersion(): string {
	return import.meta.env.SANITY_API_VERSION ?? SANITY_API_VERSION_DEFAULT;
}

function useCdn(): boolean {
	return import.meta.env.SANITY_USE_CDN !== 'false';
}

export function getSanityReadToken(): string | undefined {
	const raw =
		(typeof process !== 'undefined' && process.env.SANITY_READ_TOKEN) ||
		import.meta.env.SANITY_READ_TOKEN;
	const trimmed = typeof raw === 'string' ? raw.trim() : '';
	return trimmed || undefined;
}

export function getSanityWriteToken(): string | undefined {
	const raw =
		(typeof process !== 'undefined' && process.env.SANITY_API_WRITE_TOKEN) ||
		import.meta.env.SANITY_API_WRITE_TOKEN;
	const trimmed = typeof raw === 'string' ? raw.trim() : '';
	return trimmed || undefined;
}

let client: SanityClient | null = null;
let clientTokenCache: string | undefined;

export function getSanityClient(): SanityClient {
	const token = getSanityReadToken();
	if (!client || clientTokenCache !== token) {
		clientTokenCache = token;
		client = createClient({
			projectId: getProjectId(),
			dataset: getDataset(),
			apiVersion: getApiVersion(),
			useCdn: useCdn(),
			perspective: 'published',
			...(token ? { token } : {}),
		});
	}
	return client;
}

export function getSanityWriteClient(): SanityClient {
	const token = getSanityWriteToken();
	if (!token) {
		throw new Error('SANITY_API_WRITE_TOKEN is required for writes');
	}
	return createClient({
		projectId: getProjectId(),
		dataset: getDataset(),
		apiVersion: getApiVersion(),
		useCdn: false,
		token,
		perspective: 'raw',
	});
}

export function getSanityProjectDetails(): { projectId: string; dataset: string } {
	return { projectId: getProjectId(), dataset: getDataset() };
}
