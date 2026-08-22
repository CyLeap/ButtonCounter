<script lang="ts">
	import CountButton from '$lib/components/CountButton.svelte';
	import CountDisplay from '$lib/components/CountDisplay.svelte';
	import ResetButton from '$lib/components/ResetButton.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { enhance } from '$app/forms';
	import { resolveRoute } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let incrementError = $state<string | null>(null);
</script>

<div class="flex min-h-screen flex-col items-center bg-bg">
	<header class="grid w-full grid-cols-3 items-center py-10">
		<a
			href={resolveRoute('/history')}
			class="text-md justify-self-start pl-6 text-ink/60 transition hover:text-ink"
		>
			歴史
		</a>
		<h1 class="bold mt-1 font-['Noto_Sans_JP'] text-3xl tracking-[0.3em] text-ink">
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
			<CountDisplay count={data.count} />
			<div class="flex flex-col items-center gap-5 sm:gap-6">
				<form
					method="POST"
					action="?/increment"
					use:enhance={() => {
						incrementError = null;
						return async ({ result, update }) => {
							if (result.type === 'failure') {
								incrementError =
									(result.data as { error?: string } | undefined)?.error ??
									'Increment failed. Please try again.';
							} else {
								await update();
							}
						};
					}}
				>
					<CountButton />
				</form>
				{#if incrementError}
					<p class="text-sm text-red-600">{incrementError}</p>
				{/if}
				<ResetButton />
			</div>
			<span
				class="text-center font-['Noto_Sans_JP'] text-[10px] tracking-[0.2em] text-accent/70 sm:tracking-[0.3em]"
			>
				ボタンをクリックして下さい
			</span>
		</div>
	</main>
</div>
