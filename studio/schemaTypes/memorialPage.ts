import { defineArrayMember, defineField, defineType } from 'sanity';

export const memorialPage = defineType({
	name: 'memorialPage',
	title: 'Memorial Page',
	type: 'document',
	fields: [
		defineField({
			name: 'headline',
			title: 'Headline',
			type: 'string',
			initialValue: 'The Life of Lowell Hunter Gypson III',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'lifeDates',
			title: 'Life dates',
			type: 'string',
			initialValue: 'March 5, 1951 – April 28, 2026',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'epitaph',
			title: 'Epitaph',
			type: 'string',
			initialValue: '"Well done, good and faithful servant."',
		}),
		defineField({
			name: 'videoProvider',
			title: 'Video provider',
			type: 'string',
			options: {
				list: [{ title: 'YouTube', value: 'youtube' }],
			},
			initialValue: 'youtube',
		}),
		defineField({
			name: 'videoId',
			title: 'YouTube video ID',
			type: 'string',
			initialValue: 'G2VFZVTJZgI',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'portrait',
			title: 'Portrait',
			type: 'image',
			options: { hotspot: true },
			fields: [
				defineField({
					name: 'alt',
					title: 'Alt text',
					type: 'string',
					initialValue: 'Lowell Hunter Gypson III, young portrait',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
		defineField({
			name: 'obituary',
			title: 'Obituary',
			type: 'array',
			of: [defineArrayMember({ type: 'block' })],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'seoDescription',
			title: 'SEO description',
			type: 'text',
			rows: 3,
		}),
	],
	preview: {
		prepare() {
			return { title: 'Memorial Page' };
		},
	},
});
