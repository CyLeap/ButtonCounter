// The DB stores clicked_at/updated_at as Cambodia wall-clock time (ICT, UTC+7,
// via DATETIME('now', '+7 hours')) with no timezone marker. Mark that shape as
// UTC and format with timeZone: 'UTC' so the digits shown always match exactly
// what's stored, regardless of the viewer's own device timezone.
function toDate(date: string | Date): Date {
	if (date instanceof Date) return date
	const isUnmarked = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(date)
	return new Date(isUnmarked ? `${date.replace(' ', 'T')}Z` : date)
}

export function formatDate(date: string | Date): string {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZone: 'UTC',
	}).format(toDate(date))
}

export function formatDateJP(date: string | Date): string {
	return new Intl.DateTimeFormat('ja-JP', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'UTC',
	}).format(toDate(date))
}
