import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { ensure_count_history_table, get_count_history, get_count_history_total } from "$lib/server/counter"

const PAGE_SIZE = 15

export const load: PageServerLoad = async ({ url }) => {
	try {
		await ensure_count_history_table()

		const total = await get_count_history_total()
		const total_pages = Math.max(1, Math.ceil(total / PAGE_SIZE))

		const requested_page = Number(url.searchParams.get("page"))
		const page = Number.isInteger(requested_page)
			? Math.min(Math.max(requested_page, 1), total_pages)
			: 1

		const history = await get_count_history({ limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE })

		return { history, page, totalPages: total_pages, total, pageSize: PAGE_SIZE }
	} catch (e) {
		console.error("Failed to load history:", e)
		error(500, "Could not load history. Please try again later.")
	}
}
