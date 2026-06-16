import type { StructureResolver } from 'sanity/structure';

const MEMORIAL_PAGE_DOC_ID = 'memorialPage';

export const structure: StructureResolver = (S) =>
	S.list()
		.title('Lowell Gypson Memorial')
		.items([
			S.listItem()
				.title('Memorial Page')
				.id(MEMORIAL_PAGE_DOC_ID)
				.child(S.document().schemaType('memorialPage').documentId(MEMORIAL_PAGE_DOC_ID)),
			S.divider(),
			S.listItem()
				.title('Pending Tributes')
				.child(
					S.documentList()
						.title('Pending Tributes')
						.filter('_type == "tribute" && status == "pending"')
						.defaultOrdering([{ field: 'submittedAt', direction: 'desc' }]),
				),
			S.listItem()
				.title('All Tributes')
				.child(
					S.documentList()
						.title('All Tributes')
						.filter('_type == "tribute"')
						.defaultOrdering([{ field: 'submittedAt', direction: 'desc' }]),
				),
			S.listItem()
				.title('Photos')
				.child(
					S.documentList()
						.title('Memorial Photos')
						.filter('_type == "memorialPhoto"')
						.defaultOrdering([{ field: 'sortOrder', direction: 'asc' }]),
				),
		]);
