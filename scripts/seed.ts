import { createClient } from '@libsql/client';
import 'dotenv/config';

const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
	throw new Error('Turso database environment variables are not configured');
}

const db = createClient({
	url: TURSO_DATABASE_URL,
	authToken: TURSO_AUTH_TOKEN
});

async function seed() {
	console.log('Seeding database...');

	// counters テーブルが空の場合のみ、初期データを挿入する
	const existing = await db.execute('SELECT COUNT(*) as count FROM counters');
	const rowCount = (existing.rows[0] as { count: number }).count;

	if (rowCount > 0) {
		console.log(
			`counters テーブルには既に ${rowCount} 件のデータがあります。シードをスキップします。`
		);
		return;
	}

	await db.execute({
		sql: 'INSERT INTO counters (count) VALUES (?)',
		args: [0]
	});

	console.log('初期データを挿入しました: count = 0');

	// 確認
	const result = await db.execute('SELECT * FROM counters');
	console.log('現在の counters テーブルの内容:', result.rows);
}

seed()
	.then(() => {
		console.log('シード完了');
		process.exit(0);
	})
	.catch((err) => {
		console.error('シード中にエラーが発生しました:', err);
		process.exit(1);
	});
