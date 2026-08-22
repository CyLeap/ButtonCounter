<script lang="ts">
	import { formatDateJP } from '$lib/utils/date_format';

	type HistoryEntry = {
		id: number;
		count: number;
		clicked_at: string | Date;
	};

	type Props = {
		history: HistoryEntry[];
		startIndex?: number;
	};

	let { history, startIndex = 0 }: Props = $props();
</script>

<div class="overflow-x-auto rounded-lg border border-border bg-surface">
	<table class="w-full text-left text-sm">
		<thead class="bg-table-header text-table-header-fg">
			<tr>
				<th class="px-6 py-3 font-medium">#</th>
				<th class="px-6 py-3 font-medium">カウント</th>
				<th class="px-6 py-3 font-medium">クリック日時</th>
			</tr>
		</thead>
		<tbody>
			{#each history as entry, i (entry.id)}
				<tr class="border-t border-border-soft transition hover:bg-row-hover">
					<td class="px-6 py-3 text-dim">{startIndex + i + 1}</td>
					<td class="px-6 py-3 font-medium text-ink">{entry.count}</td>
					<td class="px-6 py-3 text-muted">{formatDateJP(entry.clicked_at)}</td>
				</tr>
			{:else}
				<tr>
					<td colspan="3" class="px-6 py-8 text-center text-dim">No history yet.</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
