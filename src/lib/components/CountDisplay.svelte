<script lang="ts">
	let { count = 0 }: { count?: number } = $props();
</script>

<div class="flex flex-col items-center gap-1">
	<span class="text-8xl font-extrabold text-slate-600 tabular-nums">
		{count}
	</span>
	<span class="text-xs font-medium tracking-widest text-slate-400 uppercase">カウント</span>
</div>
