import type { RequestHandler } from "./$types"
import { error, json } from "@sveltejs/kit"
import { get_counter } from "$lib/server/counter"

export const GET: RequestHandler = async () => {
	try {
		return json({ count: await get_counter() })
	} catch (e) {
		console.error("Failed to load count:", e)
		error(500, "Could not load count. Please try again later.")
	}
}
