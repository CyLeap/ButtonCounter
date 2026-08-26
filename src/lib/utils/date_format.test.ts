import { describe, expect, it } from "vitest"
import { format_date, format_date_jp } from "./date_format"

describe("formatDate", () => {
	it("formats timestamps in user-friendly format", () => {
		expect(format_date("2026-08-26 00:00:00")).toBe("Aug 26, 2026, 12:00:00 AM")
	})
})

describe("formatDateJP", () => {
	it("formats timestamps in Japanese locale", () => {
		expect(format_date_jp("2026-08-26 00:00:00")).toBe("2026年8月26日 00:00")
	})
})
