<script lang="ts">
	import { resolve } from '$app/paths'

	type Props = {
		page: number
		totalPages: number
	}

	let { page, totalPages }: Props = $props()
</script>

{#if totalPages > 1}
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

		<span class="text-muted">{page} / {totalPages}</span>

		{#if page < totalPages}
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
