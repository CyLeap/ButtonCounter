<script lang="ts">
	let { count = 0 }: { count?: number } = $props();
</script>

<div class="flex flex-col items-center gap-1">
	<span class="text-8xl font-extrabold tabular-nums text-black-600">
		{count}
	</span>
	<span class="text-xs uppercase tracking-widest text-slate-400 font-medium">カウト</span>
</div>
