import { getSanityWriteClient } from '../sanity/client';

export type CreateTributeInput = {
	authorName: string;
	relationship?: string;
	message: string;
};

export async function createPendingTribute(input: CreateTributeInput): Promise<void> {
	const client = getSanityWriteClient();
	await client.create({
		_type: 'tribute',
		authorName: input.authorName,
		relationship: input.relationship ?? '',
		message: input.message,
		status: 'pending',
		submittedAt: new Date().toISOString(),
	});
}
