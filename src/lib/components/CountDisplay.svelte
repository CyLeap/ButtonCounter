<script lang="ts">
	import { play } from '$lib/motion';

	let { count = 0 }: { count?: number } = $props();

	let numberEl: HTMLSpanElement | undefined;
	// Plain let, not $state - tracking it would re-trigger the effect below.
	let previous: number | undefined;

	$effect(() => {
		const current = count;
		const isFirstRender = previous === undefined;
		previous = current;

		// The number already on screen at mount shouldn't pop.
		if (isFirstRender) return;

		play(
			numberEl,
			[
				{ transform: 'scale(1)' },
				{ transform: 'scale(1.18)', offset: 0.4 },
				{ transform: 'scale(1)' }
			],
			{ duration: 220, easing: 'ease-out' }
		);
	});
</script>

<div class="flex flex-col items-center gap-1">
	<!-- inline-block: transforms have no effect on inline elements -->
	<span
		bind:this={numberEl}
		class="inline-block text-7xl font-extrabold text-slate-600 tabular-nums sm:text-8xl"
	>
		{count}
	</span>
	<span class="text-xs font-medium tracking-widest text-slate-400 uppercase">カウント</span>
</div>
