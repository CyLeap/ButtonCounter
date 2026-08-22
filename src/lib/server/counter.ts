import { db } from '$lib/server/db';

interface CountHistory {
	id: number;
	counter_id: number;
	count: number;
	clicked_at: string;
}

function toCountHistory(row: Record<string, unknown>): CountHistory {
	if (
		typeof row.id !== 'number' ||
		typeof row.counter_id !== 'number' ||
		typeof row.count !== 'number' ||
		typeof row.clicked_at !== 'string'
	) {
		throw new Error(`Invalid count_history row shape: ${JSON.stringify(row)}`);
	}

	return {
		id: row.id,
		counter_id: row.counter_id,
		count: row.count,
		clicked_at: row.clicked_at
	};
}

export async function ensureCounterTable() {
	await db.execute(
		`
    CREATE TABLE IF NOT EXISTS counters (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      value INTEGER NOT NULL DEFAULT 0,
	  updated_at TEXT DEFAULT (DATETIME('now'))
    )
    `
	);
	await db.execute(`INSERT OR IGNORE INTO counters (id, value) VALUES (1, 0)`);
}

export async function ensureCountHistoryTable() {
	await db.execute(
		`
    CREATE TABLE IF NOT EXISTS count_histories (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        counter_id INTEGER NOT NULL REFERENCES counters(id),
        count      INTEGER NOT NULL,
        clicked_at TEXT DEFAULT (DATETIME('now'))
    );
    `
	);
}

export async function getCounter(): Promise<number> {
	const result = await db.execute('SELECT value FROM counters WHERE id = 1');
	const value = result.rows[0]?.value ?? 0;
	return typeof value === 'number' ? value : Number(value);
}

export async function incrementCounter(): Promise<number> {
	await db.execute('UPDATE counters SET value = value + 1 WHERE id = 1');
	const newValue = await getCounter();
	await db.execute({
		sql: 'INSERT INTO count_histories (counter_id, count) VALUES (?, ?)',
		args: [1, newValue]
	});
	return newValue;
}

export async function resetCounter(): Promise<number> {
	await db.execute('UPDATE counters SET value = 0 WHERE id = 1');
	return getCounter();
}

export async function getCountHistory(): Promise<CountHistory[]> {
	const result = await db.execute('SELECT * FROM count_histories ORDER BY clicked_at DESC');
	return result.rows.map((row) => toCountHistory(row as Record<string, unknown>));
}
