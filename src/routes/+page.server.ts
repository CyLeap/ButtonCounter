import type { PageServerLoad, Actions } from './$types';
import { ensureCounterTable, getCounter, incrementCounter } from '$lib/server/counter';

export const load: PageServerLoad = async () => {
	await ensureCounterTable();
	return { count: await getCounter() };
};

export const actions: Actions = {
	increment: async () => {
		const count = await incrementCounter();
		return { count };
	}
};
