<script lang="ts">
	import { play } from '$lib/motion';

	let { label = 'クリック' }: { label?: string } = $props();

	let wrapper: HTMLSpanElement | undefined;

	function playPress() {
		play(
			wrapper,
			[
				{ transform: 'scale(1)' },
				{ transform: 'scale(0.9)', offset: 0.3 },
				{ transform: 'scale(1.06)', offset: 0.65 },
				{ transform: 'scale(1)' }
			],
			{ duration: 260, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
		);
	}
</script>

<span bind:this={wrapper} class="inline-block">
	<button
		type="submit"
		onclick={playPress}
		class="group relative h-20 w-20 -rotate-3 touch-manipulation rounded-full bg-[#BE3144] shadow-[0_6px_0_0_#7A1F2B,0_10px_22px_rgba(0,0,0,0.35)] transition-all
	       duration-100
	       select-none
	       hover:-rotate-1 active:translate-y-1.5
	       active:rotate-0
	       active:shadow-[0_0px_0_0_#7A1F2B,0_2px_6px_rgba(0,0,0,0.3)] sm:h-24 sm:w-24"
	>
		<span
			class="absolute inset-1.5 flex items-center justify-center rounded-full border-2 border-white/70"
		>
			<span class="font-['Noto_Sans_JP'] text-lg font-bold text-white sm:text-xl">{label}</span>
		</span>
	</button>
</span>
