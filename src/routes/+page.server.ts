import type { PageServerLoad, Actions } from './$types';
import {
	ensureCounterTable,
	ensureCountHistoryTable,
	getCounter,
	incrementCounter
} from '$lib/server/counter';

export const load: PageServerLoad = async () => {
	await ensureCounterTable();
	await ensureCountHistoryTable();
	return { count: await getCounter() };
};

export const actions: Actions = {
	increment: async () => {
		const count = await incrementCounter();
		return { count };
	},
	reset: async () => {
		const count = await resetCounter();
		return { count };
	}
};
