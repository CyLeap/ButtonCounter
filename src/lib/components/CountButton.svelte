<script lang="ts">
	let { label = 'クリック' }: { label?: string } = $props();
</script>

<button
	type="submit"
	class="group relative h-24 w-24 -rotate-3 rounded-full
	       bg-[#BE3144]
	       shadow-[0_6px_0_0_#7A1F2B,0_10px_22px_rgba(0,0,0,0.35)]
	       transition-all duration-100
	       hover:-rotate-1
	       active:translate-y-1.5 active:rotate-0 active:shadow-[0_0px_0_0_#7A1F2B,0_2px_6px_rgba(0,0,0,0.3)]"
>
	<span
		class="absolute inset-1.5 flex items-center justify-center rounded-full border-2 border-white/70"
	>
		<span class="font-['Noto_Sans_JP'] text-xl font-bold text-white">{label}</span>
	</span>
</button>
