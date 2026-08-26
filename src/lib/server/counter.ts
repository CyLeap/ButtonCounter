import { db } from "$lib/server/db"

interface CountHistory {
	id: number
	counter_id: number
	count: number
	clicked_at: string
}

function toCountHistory(row: Record<string, unknown>): CountHistory {
	if (
		typeof row.id !== "number" ||
		typeof row.counter_id !== "number" ||
		typeof row.count !== "number" ||
		typeof row.clicked_at !== "string"
	) {
		throw new Error(`Invalid count_history row shape: ${JSON.stringify(row)}`)
	}

	return {
		id: row.id,
		counter_id: row.counter_id,
		count: row.count,
		clicked_at: row.clicked_at,
	}
}

export async function ensureCounterTable() {
	try {
		await db.execute(`
			CREATE TABLE IF NOT EXISTS counters (
				id INTEGER PRIMARY KEY CHECK (id = 1),
				value INTEGER NOT NULL DEFAULT 0,
				updated_at TEXT DEFAULT (DATETIME('now', '+7 hours'))
			)
		`)
		await db.execute(`INSERT OR IGNORE INTO counters (id, value) VALUES (1, 0)`)
	} catch (error) {
		throw new Error(
			`Failed to initialise counters table: ${error instanceof Error ? error.message : String(error)}`,
			{ cause: error },
		)
	}
}

export async function ensureCountHistoryTable() {
	try {
		await db.execute(`
			CREATE TABLE IF NOT EXISTS count_histories (
				id         INTEGER PRIMARY KEY AUTOINCREMENT,
				counter_id INTEGER NOT NULL REFERENCES counters(id),
				count      INTEGER NOT NULL,
				clicked_at TEXT DEFAULT (DATETIME('now', '+7 hours'))
			)
		`)
	} catch (error) {
		throw new Error(
			`Failed to initialise count_histories table: ${error instanceof Error ? error.message : String(error)}`,
			{ cause: error },
		)
	}
}

export async function getCounter(): Promise<number> {
	try {
		const result = await db.execute("SELECT value FROM counters WHERE id = 1")
		const value = result.rows[0]?.value ?? 0
		return typeof value === "number" ? value : Number(value)
	} catch (error) {
		throw new Error(
			`Failed to retrieve counter: ${error instanceof Error ? error.message : String(error)}`,
			{ cause: error },
		)
	}
}

export async function incrementCounter(): Promise<number> {
	try {
		const [updateResult] = await db.batch(
			[
				"UPDATE counters SET value = value + 1, updated_at = DATETIME('now', '+7 hours') WHERE id = 1 RETURNING value",
				"INSERT INTO count_histories (counter_id, count, clicked_at) VALUES (1, (SELECT value FROM counters WHERE id = 1), DATETIME('now', '+7 hours'))",
			],
			"write",
		)

		const raw = updateResult.rows[0]?.value ?? 0
		return typeof raw === "number" ? raw : Number(raw)
	} catch (error) {
		throw new Error(
			`Failed to increment counter: ${error instanceof Error ? error.message : String(error)}`,
			{ cause: error },
		)
	}
}

export async function resetCounter(): Promise<number> {
	try {
		const result = await db.execute(
			"UPDATE counters SET value = 0, updated_at = DATETIME('now', '+7 hours') WHERE id = 1 RETURNING value",
		)
		const raw = result.rows[0]?.value ?? 0
		return typeof raw === "number" ? raw : Number(raw)
	} catch (error) {
		throw new Error(
			`Failed to reset counter: ${error instanceof Error ? error.message : String(error)}`,
			{ cause: error },
		)
	}
}

export async function getCountHistory({
	limit = 50,
	offset = 0,
}: { limit?: number; offset?: number } = {}): Promise<CountHistory[]> {
	try {
		const result = await db.execute({
			sql: "SELECT * FROM count_histories ORDER BY clicked_at DESC LIMIT ? OFFSET ?",
			args: [limit, offset],
		})
		return result.rows.map((row) => toCountHistory(row as Record<string, unknown>))
	} catch (error) {
		throw new Error(
			`Failed to retrieve count history: ${error instanceof Error ? error.message : String(error)}`,
			{ cause: error },
		)
	}
}

export async function getCountHistoryTotal(): Promise<number> {
	try {
		const result = await db.execute("SELECT COUNT(*) as total FROM count_histories")
		const value = result.rows[0]?.total ?? 0
		return typeof value === "number" ? value : Number(value)
	} catch (error) {
		throw new Error(
			`Failed to retrieve count history total: ${error instanceof Error ? error.message : String(error)}`,
			{ cause: error },
		)
	}
}
