import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ensureCountHistoryTable, getCountHistory } from '$lib/server/counter';

export const load: PageServerLoad = async () => {
	try {
		await ensureCountHistoryTable();
		const history = await getCountHistory();
		return { history };
	} catch (e) {
		console.error('Failed to load history:', e);
		error(500, 'Could not load history. Please try again later.');
	}
};
