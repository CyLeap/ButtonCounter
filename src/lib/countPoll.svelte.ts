function create_count_poll() {
	let count = $state<number | null>(null)
	let status = $state<"idle" | "polling" | "error">("idle")
	let timer: ReturnType<typeof setInterval> | undefined

	async function tick() {
		try {
			const res = await fetch("/api/count")
			if (!res.ok) throw new Error(`Unexpected status ${res.status}`)
			const data = (await res.json()) as { count: number }
			count = data.count
			status = "polling"
		} catch (e) {
			console.error("Count poll failed:", e)
			status = "error"
		}
	}

	return {
		get count() {
			return count
		},
		get status() {
			return status
		},
		start(interval_ms = 3000) {
			tick()
			timer = setInterval(tick, interval_ms)
		},
		stop() {
			clearInterval(timer)
		},
	}
}

export const count_poll = create_count_poll()
