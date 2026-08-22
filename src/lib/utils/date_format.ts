export function formatDate(date: string | Date): string {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	}).format(new Date(date));
}

export function formatDateJP(date: string | Date): string {
	return new Intl.DateTimeFormat('ja-JP', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}).format(new Date(date));
}
