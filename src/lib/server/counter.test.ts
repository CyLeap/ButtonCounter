import { beforeEach, describe, expect, it, vi } from 'vitest'
import { db } from '$lib/server/db'
import { getCounter, resetCounter } from './counter'

vi.mock('$lib/server/db', () => ({
	db: {
		execute: vi.fn(),
		batch: vi.fn(),
	},
}))

const execute = vi.mocked(db.execute)

beforeEach(() => {
	vi.clearAllMocks()
})

describe('getCounter', () => {
	it('returns the numeric value', async () => {
		execute.mockResolvedValue({ rows: [{ value: 42 }] } as never)
		await expect(getCounter()).resolves.toBe(42)
	})

	it('returns 0 when no row exists', async () => {
		execute.mockResolvedValue({ rows: [] } as never)
		await expect(getCounter()).resolves.toBe(0)
	})
})

describe('resetCounter', () => {
	it('returns 0 after resetting', async () => {
		await expect(resetCounter()).resolves.toBe(0)
	})
})
