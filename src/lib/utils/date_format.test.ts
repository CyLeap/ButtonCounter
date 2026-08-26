import { describe, expect, it } from 'vitest'
import { formatDate, formatDateJP } from './date_format'

describe('formatDate', () => {
	it('formats timestamps in user-friendly format', () => {
		expect(formatDate('2026-08-26 00:00:00')).toBe('Aug 26, 2026, 12:00:00 AM')
	})
})

describe('formatDateJP', () => {
	it('formats timestamps in Japanese locale', () => {
		expect(formatDateJP('2026-08-26 00:00:00')).toBe('2026年8月26日 00:00')
	})
})
