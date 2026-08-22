<script lang="ts">
	import CountButton from '$lib/components/CountButton.svelte';
	import CountDisplay from '$lib/components/CountDisplay.svelte';
	import ResetButton from '$lib/components/ResetButton.svelte';
	import { enhance } from '$app/forms';
	import { resolveRoute } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex min-h-screen flex-col items-center bg-[#F3ECDF]">
	<header class="grid w-full grid-cols-3 items-center py-10">
		<a
			href={resolveRoute('/history')}
			class="text-md justify-self-start pl-6 text-[#1B2A4A]/60 transition hover:text-[#1B2A4A]"
		>
			歴史
		</a>
		<h1 class="bold mt-1 font-['Noto_Sans_JP'] text-3xl tracking-[0.3em] text-[#1B2A4A]">
			ボタン カウンター
		</h1>
		<span aria-hidden="true" />
	</header>

	<main class="flex w-full max-w-xl flex-1 items-center justify-center px-4 sm:px-6">
		<div
			class="relative flex w-full flex-col items-center gap-8 rounded-2xl border border-[#C9A227]/40 bg-white p-8 shadow-2xl shadow-[#C9A227]/30 sm:gap-10 sm:p-12 md:p-16"
		>
			<CountDisplay count={data.count} />
			<div class="flex flex-col items-center gap-5 sm:gap-6">
				<form method="POST" action="?/increment" use:enhance>
					<CountButton />
				</form>
				<ResetButton />
			</div>

			<span
				class="text-center font-['Noto_Sans_JP'] text-[10px] tracking-[0.2em] text-[#C9A227]/70 sm:tracking-[0.3em]"
				>ボタンをクリックして下さい</span
			>
		</div>
	</main>
</div>
