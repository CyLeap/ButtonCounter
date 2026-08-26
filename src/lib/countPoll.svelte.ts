function createCountPoll() {
	let count = $state<number | null>(null)
	let status = $state<'idle' | 'polling' | 'error'>('idle')
	let timer: ReturnType<typeof setInterval> | undefined

	async function tick() {
		try {
			const res = await fetch('/api/count')
			if (!res.ok) throw new Error(`Unexpected status ${res.status}`)
			const data = (await res.json()) as { count: number }
			count = data.count
			status = 'polling'
		} catch (e) {
			console.error('Count poll failed:', e)
			status = 'error'
		}
	}

	return {
		get count() {
			return count
		},
		get status() {
			return status
		},
		start(intervalMs = 3000) {
			tick()
			timer = setInterval(tick, intervalMs)
		},
		stop() {
			clearInterval(timer)
		},
	}
}

export const countPoll = createCountPoll()
