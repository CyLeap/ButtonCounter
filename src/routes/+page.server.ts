import type { PageServerLoad, Actions } from "./$types"
import { error, fail } from "@sveltejs/kit"
import {
	ensure_count_history_table,
	ensure_counter_table,
	get_counter,
	increment_counter,
	reset_counter,
} from "$lib/server/counter"

export const load: PageServerLoad = async () => {
	try {
		await ensure_counter_table()
		await ensure_count_history_table()
		return { count: await get_counter() }
	} catch (e) {
		console.error("Failed to load counter:", e)
		error(500, "Could not load counter. Please try again later.")
	}
}

export const actions: Actions = {
	increment: async () => {
		try {
			const count = await increment_counter()
			return { count }
		} catch (e) {
			console.error("Failed to increment counter:", e)
			return fail(500, { error: "Increment failed. Please try again." })
		}
	},
	reset: async () => {
		try {
			const count = await reset_counter()
			return { count }
		} catch (e) {
			console.error("Failed to reset counter:", e)
			return fail(500, { error: "Reset failed. Please try again." })
		}
	},
}
