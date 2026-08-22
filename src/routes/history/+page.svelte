<script lang="ts">
	import type { PageProps } from './$types';
	import { resolveRoute } from '$app/paths';
	import HistoryTable from '$lib/components/HistoryTable.svelte';

	let { data }: PageProps = $props();
</script>

<div class="flex min-h-screen flex-col bg-bg">
	<header class="grid w-full grid-cols-3 items-center py-10">
		<a
			href={resolveRoute('/')}
			class="justify-self-start pl-6 text-sm text-ink/60 transition hover:text-ink"
		>
			← 後ろ
		</a>
		<h1
			class="justify-self-center font-['Noto_Sans_JP'] text-3xl font-bold tracking-[0.3em] text-ink"
		>
			履歴
		</h1>
		<span aria-hidden="true" />
	</header>

	<main class="mx-auto w-full max-w-2xl px-4">
		<HistoryTable history={data.history} />
	</main>
</div>
