/** Descriptions support *italic* and **bold** text, without links or raw HTML. */
export function descriptionParts(value: string = '') {
	return value.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g).map((text) => {
		if (text.startsWith('**') && text.endsWith('**') && text.length > 4) {
			return { kind: 'strong', text: text.slice(2, -2) };
		}
		if (text.startsWith('*') && text.endsWith('*') && text.length > 2) {
			return { kind: 'em', text: text.slice(1, -1) };
		}
		return { kind: 'text', text };
	});
}

export function plainDescription(value: string = ''): string {
	return descriptionParts(value).map(({ text }) => text).join('');
}
