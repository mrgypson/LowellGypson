import { defineField, defineType } from 'sanity';

export const tribute = defineType({
	name: 'tribute',
	title: 'Tribute',
	type: 'document',
	fields: [
		defineField({
			name: 'authorName',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required().max(80),
		}),
		defineField({
			name: 'relationship',
			title: 'Relationship',
			type: 'string',
			description: 'Optional — e.g. Son, Friend, Congregation member',
		}),
		defineField({
			name: 'message',
			title: 'Message',
			type: 'text',
			rows: 5,
			validation: (Rule) => Rule.required().max(2000),
		}),
		defineField({
			name: 'status',
			title: 'Status',
			type: 'string',
			options: {
				list: [
					{ title: 'Published', value: 'approved' },
					{ title: 'Hidden (taken down)', value: 'rejected' },
				],
				layout: 'radio',
			},
			initialValue: 'approved',
			description: 'Set to Hidden to remove a tribute from the public site.',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'submittedAt',
			title: 'Submitted at',
			type: 'datetime',
			initialValue: () => new Date().toISOString(),
		}),
		defineField({
			name: 'moderatorNote',
			title: 'Moderator note (private)',
			type: 'text',
			rows: 2,
			description: 'Internal note — not shown on the public site.',
		}),
	],
	preview: {
		select: {
			title: 'authorName',
			subtitle: 'message',
			status: 'status',
		},
		prepare({ title, subtitle, status }) {
			return {
				title: `${title} (${status})`,
				subtitle: subtitle as string | undefined,
			};
		},
	},
	orderings: [
		{
			title: 'Submitted, newest',
			name: 'submittedAtDesc',
			by: [{ field: 'submittedAt', direction: 'desc' }],
		},
	],
});
