<script lang="ts">
	import { onMount } from "svelte"
	import CountButton from "$lib/components/CountButton.svelte"
	import CountDisplay from "$lib/components/CountDisplay.svelte"
	import ResetButton from "$lib/components/ResetButton.svelte"
	import ThemeToggle from "$lib/components/ThemeToggle.svelte"
	import { count_poll } from "$lib/countPoll.svelte"
	import { enhance } from "$app/forms"
	import { resolve } from "$app/paths"
	import type { PageProps } from "./$types"

	let { data }: PageProps = $props()

	let count = $state(data.count)

	let increment_pending = $state(false)
	let increment_error = $state<string | null>(null)

	onMount(() => {
		count_poll.start()
		return () => count_poll.stop()
	})

	$effect(() => {
		if (count_poll.count !== null) count = count_poll.count
	})
</script>

<div class="flex min-h-screen flex-col items-center bg-bg">
	<header class="grid w-full grid-cols-3 items-center py-10">
		<a
			href={resolve("/history")}
			class="text-md justify-self-start pl-6 text-ink/60 transition hover:text-ink"
		>
			歴史
		</a>
		<h1 class="bold mt-1 text-center font-['Noto_Sans_JP'] text-3xl tracking-[0.3em] text-ink">
			ボタン カウンター
		</h1>
		<div class="justify-self-end pr-6">
			<ThemeToggle />
		</div>
	</header>

	<main class="flex w-full max-w-xl flex-1 items-center justify-center px-4 sm:px-6">
		<div
			class="relative flex w-full flex-col items-center gap-8 rounded-2xl
             border border-accent/40 bg-surface
             p-8 shadow-2xl shadow-accent/30
             sm:gap-10 sm:p-12 md:p-16"
		>
			<CountDisplay {count} />
			<div class="flex flex-col items-center gap-5 sm:gap-6">
				<form
					method="POST"
					action="?/increment"
					use:enhance={({ cancel }) => {
						if (increment_pending) {
							cancel()
							return
						}
						increment_pending = true
						increment_error = null
						return async ({ result }) => {
							increment_pending = false
							if (result.type === "success") {
								count = (result.data as { count: number }).count
							} else if (result.type === "failure") {
								increment_error =
									(result.data as { error?: string } | undefined)?.error ??
									"Increment failed. Please try again."
							}
						}
					}}
				>
					<fieldset disabled={increment_pending} class="contents">
						<CountButton />
					</fieldset>
				</form>
				{#if increment_error}
					<p class="text-sm text-red-600">{increment_error}</p>
				{/if}
				{#if count_poll.status === "error"}
					<p class="text-sm text-red-600">Sync lost. Retrying…</p>
				{/if}
				<ResetButton on_reset={(new_count) => (count = new_count)} />
			</div>
			<span
				class="text-center font-['Noto_Sans_JP'] text-[10px] tracking-[0.2em] text-accent/70 sm:tracking-[0.3em]"
			>
				ボタンをクリックして下さい
			</span>
		</div>
	</main>
</div>
