import { getSanityWriteClient } from '../sanity/client';

export type CreateTributeInput = {
	authorName: string;
	relationship?: string;
	message: string;
};

export async function createTribute(input: CreateTributeInput): Promise<void> {
	const client = getSanityWriteClient();
	await client.create({
		_type: 'tribute',
		authorName: input.authorName,
		relationship: input.relationship ?? '',
		message: input.message,
		status: 'approved',
		submittedAt: new Date().toISOString(),
	});
}
