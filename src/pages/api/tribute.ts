import type { APIRoute } from 'astro';
import { createPendingTribute } from '../../lib/tribute/createTribute';
import { validateTributeBody } from '../../lib/tribute/validateTribute';

export const prerender = false;

function json(data: unknown, status: number) {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
}

export const POST: APIRoute = async ({ request }) => {
	if (request.headers.get('content-type')?.split(';')[0]?.trim() !== 'application/json') {
		return json({ ok: false, error: 'Expected application/json.' }, 415);
	}

	let parsed: unknown;
	try {
		parsed = await request.json();
	} catch {
		return json({ ok: false, error: 'Invalid JSON.' }, 400);
	}

	const validated = validateTributeBody(parsed);
	if (!validated.ok) {
		return json({ ok: false, error: validated.error }, 400);
	}
	if ('honeypot' in validated && validated.honeypot) {
		return json({ ok: true }, 200);
	}

	if (!('value' in validated)) {
		return json({ ok: true }, 200);
	}

	try {
		await createPendingTribute(validated.value);
		return json({ ok: true }, 201);
	} catch (err) {
		console.error('[tribute] Failed to create tribute', err);
		return json(
			{ ok: false, error: 'Unable to submit tribute right now. Please try again later.' },
			503,
		);
	}
};
