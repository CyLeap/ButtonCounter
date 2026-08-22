<script lang="ts">
	import CountButton from '$lib/components/CountButton.svelte';
	import CountDisplay from '$lib/components/CountDisplay.svelte';
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex min-h-screen flex-col items-center bg-[#F3ECDF]">
	<header class="w-full py-10 text-center">
		<h1 class="bold mt-1 font-['Noto_Sans_JP'] text-3xl tracking-[0.3em] text-[#1B2A4A]">
			ボタン カウンター
		</h1>
	</header>

	<main class="flex w-full max-w-xl flex-1 items-center justify-center px-6">
		<div
			class="relative flex w-full flex-col items-center gap-10 rounded-2xl border border-[#C9A227]/40 bg-white p-16 pl-20 shadow-2xl shadow-[#C9A227]/30"
		>
			<CountDisplay count={data.count} />
			<form method="POST" action="?/increment" use:enhance>
				<CountButton />
			</form>

			<span class="font-['Noto_Sans_JP'] text-[10px] tracking-[0.3em] text-[#C9A227]/70"
				>ボタンをクリックして下さい</span
			>
		</div>
	</main>
</div>
