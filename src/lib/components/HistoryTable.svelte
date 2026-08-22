<script lang="ts">
	import { formatDateJP } from '$lib/utils/date_format';

	type HistoryEntry = {
		id: number;
		count: number;
		clicked_at: string | Date;
	};

	type Props = {
		history: HistoryEntry[];
	};

	let { history }: Props = $props();
</script>

<div class="overflow-x-auto rounded-lg border border-gray-200">
	<table class="w-full text-left text-sm">
		<thead class="bg-[#1B2A4A] text-white">
			<tr>
				<th class="px-6 py-3 font-medium">#</th>
				<th class="px-6 py-3 font-medium">カウント</th>
				<th class="px-6 py-3 font-medium">クリック日時</th>
			</tr>
		</thead>
		<tbody>
			{#each history as entry, i (entry.id)}
				<tr class="border-t border-gray-100 transition hover:bg-gray-50">
					<td class="px-6 py-3 text-gray-400">{i + 1}</td>
					<td class="px-6 py-3 font-medium text-[#1B2A4A]">{entry.count}</td>
					<td class="px-6 py-3 text-gray-500">{formatDateJP(entry.clicked_at)}</td>
				</tr>
			{:else}
				<tr>
					<td colspan="3" class="px-6 py-8 text-center text-gray-400"> No history yet. </td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
