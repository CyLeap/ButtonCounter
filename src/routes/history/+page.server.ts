import type { PageServerLoad } from './$types';
import { ensureCountHistoryTable, getCountHistory } from '$lib/server/counter';

export const load: PageServerLoad = async () => {
	await ensureCountHistoryTable();
	const history = await getCountHistory();
	return { history };
};
