import { defineField, defineType } from 'sanity';

export const memorialPhoto = defineType({
	name: 'memorialPhoto',
	title: 'Memorial Photo',
	type: 'document',
	fields: [
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: { hotspot: true },
			fields: [
				defineField({
					name: 'alt',
					title: 'Alt text',
					type: 'string',
				}),
			],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'caption',
			title: 'Caption',
			type: 'string',
		}),
		defineField({
			name: 'sortOrder',
			title: 'Sort order',
			type: 'number',
			initialValue: 0,
		}),
	],
	preview: {
		select: {
			title: 'caption',
			media: 'image',
		},
	},
	orderings: [
		{
			title: 'Sort order',
			name: 'sortOrderAsc',
			by: [{ field: 'sortOrder', direction: 'asc' }],
		},
	],
});
