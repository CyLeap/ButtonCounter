import { db } from '$lib/server/db';

export async function ensureCounterTable() {
	await db.execute(
		`
    CREATE TABLE IF NOT EXISTS counter (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      value INTEGER NOT NULL DEFAULT 0
    )
    `
	);
	await db.execute(`INSERT OR IGNORE INTO counter (id, value) VALUES (1, 0)`);
}

export async function getCounter() {
	const result = await db.execute('SELECT value FROM counter WHERE id = 1');
	return result.rows[0]?.value ?? 0;
}

export async function incrementCounter() {
	await db.execute('UPDATE counter SET value = value + 1 WHERE id = 1');
	return getCounter();
}
