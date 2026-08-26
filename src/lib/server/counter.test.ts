import { beforeEach, describe, expect, it, vi } from "vitest"
import { db } from "$lib/server/db"
import { get_counter, reset_counter } from "./counter"

vi.mock("$lib/server/db", () => ({
	db: {
		execute: vi.fn(),
		batch: vi.fn(),
	},
}))

const execute = vi.mocked(db.execute)

beforeEach(() => {
	vi.clearAllMocks()
})

describe("getCounter", () => {
	it("returns the numeric value", async () => {
		execute.mockResolvedValue({ rows: [{ value: 42 }] } as never)
		await expect(get_counter()).resolves.toBe(42)
	})

	it("returns 0 when no row exists", async () => {
		execute.mockResolvedValue({ rows: [] } as never)
		await expect(get_counter()).resolves.toBe(0)
	})
})

describe("resetCounter", () => {
	it("returns 0 after resetting", async () => {
		await expect(reset_counter()).resolves.toBe(0)
	})
})
