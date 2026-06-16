const MAX_NAME = 80;
const MAX_RELATIONSHIP = 60;
const MAX_MESSAGE = 1000;

export type TributePayload = {
	authorName: string;
	relationship?: string;
	message: string;
	_company?: string;
};

export type TributeValidationResult =
	| { ok: true; value: { authorName: string; relationship?: string; message: string } }
	| { ok: false; error: string }
	| { ok: true; honeypot: true };

function isNonEmptyString(v: unknown): v is string {
	return typeof v === 'string' && v.trim().length > 0;
}

function stripHtml(text: string): string {
	return text.replace(/<[^>]*>/g, '').trim();
}

export function validateTributeBody(body: unknown): TributeValidationResult {
	if (!body || typeof body !== 'object') {
		return { ok: false, error: 'Invalid request body.' };
	}
	const o = body as Record<string, unknown>;
	const honeypot = o._company;
	if (typeof honeypot === 'string' && honeypot.trim() !== '') {
		return { ok: true, honeypot: true };
	}

	const authorName = o.authorName;
	const relationship = o.relationship;
	const message = o.message;

	if (!isNonEmptyString(authorName) || !isNonEmptyString(message)) {
		return { ok: false, error: 'Name and message are required.' };
	}

	const nameTrim = stripHtml(authorName.trim());
	const relationshipTrim =
		typeof relationship === 'string' && relationship.trim() ? stripHtml(relationship.trim()) : undefined;
	const messageTrim = stripHtml(message.trim());

	if (nameTrim.length > MAX_NAME) {
		return { ok: false, error: 'Name is too long.' };
	}
	if (relationshipTrim && relationshipTrim.length > MAX_RELATIONSHIP) {
		return { ok: false, error: 'Relationship is too long.' };
	}
	if (messageTrim.length > MAX_MESSAGE) {
		return { ok: false, error: 'Message is too long.' };
	}
	if (messageTrim.length < 3) {
		return { ok: false, error: 'Please write a longer message.' };
	}

	return {
		ok: true,
		value: {
			authorName: nameTrim,
			relationship: relationshipTrim,
			message: messageTrim,
		},
	};
}
