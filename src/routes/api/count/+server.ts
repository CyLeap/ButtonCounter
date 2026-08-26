import type { RequestHandler } from "./$types"
import { error, json } from "@sveltejs/kit"
import { getCounter } from "$lib/server/counter"

export const GET: RequestHandler = async () => {
	try {
		return json({ count: await getCounter() })
	} catch (e) {
		console.error("Failed to load count:", e)
		error(500, "Could not load count. Please try again later.")
	}
}
