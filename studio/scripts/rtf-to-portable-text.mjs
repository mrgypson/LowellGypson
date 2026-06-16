/**
 * Converts Lowell Story.rtf to Sanity Portable Text blocks.
 * Run: node studio/scripts/rtf-to-portable-text.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rtfPath = '/Users/markgypson/Desktop/Lowell Story.rtf';
const outPath = join(__dirname, '../seed/obituary-blocks.json');

function decodeEscapes(text) {
	return text
		.replace(/\\'a0/g, ' ')
		.replace(/\\'96/g, '–')
		.replace(/\\'97/g, '—')
		.replace(/\\'/g, "'");
}

function stripRtfCommands(text) {
	return text.replace(/\\[a-z]+-?\d* ?/gi, '').replace(/[{}]/g, '');
}

function parseItalicSegments(raw) {
	const segments = [];
	const re = /\\f1\\i\s+([\s\S]*?)\\f0\\i0/g;
	let last = 0;
	let match;
	while ((match = re.exec(raw)) !== null) {
		const before = raw.slice(last, match.index);
		if (before) segments.push({ text: cleanText(before), em: false });
		segments.push({ text: cleanText(match[1]), em: true });
		last = re.lastIndex;
	}
	const tail = raw.slice(last);
	if (tail) segments.push({ text: cleanText(tail), em: false });
	return segments.filter((s) => s.text.length > 0);
}

function cleanText(raw) {
	return decodeEscapes(stripRtfCommands(raw)).replace(/\s+/g, ' ').trim();
}

function segmentsToBlock(segments) {
	const children = segments
		.filter((s) => s.text)
		.map((s) => ({
			_type: 'span',
			_key: `span-${Math.random().toString(36).slice(2, 9)}`,
			text: s.text,
			marks: s.em ? ['em'] : [],
		}));
	if (children.length === 0) return null;
	return {
		_type: 'block',
		_key: `block-${Math.random().toString(36).slice(2, 9)}`,
		style: 'normal',
		markDefs: [],
		children,
	};
}

function extractParagraphs(rtf) {
	const matches = [...rtf.matchAll(/\\cf2 \\cb3 ([\s\S]*?)\\cf0 \\cb1/g)];
	const paragraphs = [];
	for (const match of matches) {
		const raw = match[1];
		const text = cleanText(raw);
		if (!text) continue;
		if (text.startsWith('The Life of Lowell Hunter Gypson III')) continue;
		if (text.startsWith('March 5, 1951')) continue;
		const segments = parseItalicSegments(raw);
		const block = segmentsToBlock(segments);
		if (block) paragraphs.push(block);
	}
	return paragraphs;
}

const rtf = readFileSync(rtfPath, 'utf8');
const blocks = extractParagraphs(rtf);
writeFileSync(outPath, JSON.stringify(blocks, null, 2));
console.log(`Wrote ${blocks.length} blocks to ${outPath}`);
