import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { PLACEHOLDER_PORTRAIT_SRC } from './constants';
import { getSanityProjectDetails } from './client';

const builder = createImageUrlBuilder(getSanityProjectDetails());

export const SANITY_IMAGE_MAX_WIDTH_PORTRAIT = 800;
export const SANITY_IMAGE_MAX_WIDTH_GALLERY = 1200;

export function urlForImage(
	source: SanityImageSource | null | undefined,
	maxWidth = SANITY_IMAGE_MAX_WIDTH_GALLERY,
): string {
	if (!source || typeof source !== 'object' || !('asset' in source) || !source.asset) {
		return PLACEHOLDER_PORTRAIT_SRC;
	}
	return builder.image(source).width(maxWidth).quality(85).auto('format').url();
}
