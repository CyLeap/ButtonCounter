import type { PageServerLoad, Actions } from './$types'
import { error, fail } from '@sveltejs/kit'
import {
	ensureCounterTable,
	ensureCountHistoryTable,
	getCounter,
	incrementCounter,
	resetCounter,
} from '$lib/server/counter'

export const load: PageServerLoad = async () => {
	try {
		await ensureCounterTable()
		await ensureCountHistoryTable()
		return { count: await getCounter() }
	} catch (e) {
		console.error('Failed to load counter:', e)
		error(500, 'Could not load counter. Please try again later.')
	}
}

export const actions: Actions = {
	increment: async () => {
		try {
			const count = await incrementCounter()
			return { count }
		} catch (e) {
			console.error('Failed to increment counter:', e)
			return fail(500, { error: 'Increment failed. Please try again.' })
		}
	},
	reset: async () => {
		try {
			const count = await resetCounter()
			return { count }
		} catch (e) {
			console.error('Failed to reset counter:', e)
			return fail(500, { error: 'Reset failed. Please try again.' })
		}
	},
}
