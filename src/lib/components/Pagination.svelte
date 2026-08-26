<script lang="ts">
	import { resolve } from "$app/paths"

	type Props = {
		page: number
		total_pages: number
	}

	let { page, total_pages }: Props = $props()
</script>

{#if total_pages > 1}
	<nav
		class="mt-4 flex items-center justify-center gap-4 font-['Noto_Sans_JP'] text-sm text-ink"
		aria-label="ページネーション"
	>
		{#if page > 1}
			<a
				href={resolve(`/history?page=${page - 1}`)}
				class="rounded-lg border border-border px-4 py-2 text-ink transition hover:bg-row-hover"
			>
				← 前へ
			</a>
		{:else}
			<span class="rounded-lg border border-border-soft px-4 py-2 text-dim">← 前へ</span>
		{/if}

		<span class="text-muted">{page} / {total_pages}</span>

		{#if page < total_pages}
			<a
				href={resolve(`/history?page=${page + 1}`)}
				class="rounded-lg border border-border px-4 py-2 text-ink transition hover:bg-row-hover"
			>
				次へ →
			</a>
		{:else}
			<span class="rounded-lg border border-border-soft px-4 py-2 text-dim">次へ →</span>
		{/if}
	</nav>
{/if}
