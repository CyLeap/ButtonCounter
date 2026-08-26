import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { ensureCountHistoryTable, getCountHistory, getCountHistoryTotal } from "$lib/server/counter"

const PAGE_SIZE = 15

export const load: PageServerLoad = async ({ url }) => {
	try {
		await ensureCountHistoryTable()

		const total = await getCountHistoryTotal()
		const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

		const requestedPage = Number(url.searchParams.get("page"))
		const page = Number.isInteger(requestedPage)
			? Math.min(Math.max(requestedPage, 1), totalPages)
			: 1

		const history = await getCountHistory({ limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE })

		return { history, page, totalPages, total, pageSize: PAGE_SIZE }
	} catch (e) {
		console.error("Failed to load history:", e)
		error(500, "Could not load history. Please try again later.")
	}
}
