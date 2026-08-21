<script lang="ts">
	import CountButton from '$lib/components/CountButton.svelte';
	import CountDisplay from '$lib/components/CountDisplay.svelte';
    
</script>

<div class="min-h-screen flex flex-col items-center bg-[#F3ECDF]">
	<header class="w-full py-10 text-center">

		<h1 class="font-['Noto_Sans_JP'] text-3xl bold tracking-[0.3em] text-[#1B2A4A] mt-1">ボタン カウンター</h1>
	</header>

	<main class="flex-1 w-full max-w-xl flex items-center justify-center px-6">
		<div class="relative w-full rounded-2xl bg-white p-16 pl-20 flex flex-col items-center gap-10 border border-[#C9A227]/40 shadow-2xl shadow-[#C9A227]/30">
			

			<CountDisplay count={0} />
			<CountButton />

			<span class="font-['Noto_Sans_JP'] text-[10px] tracking-[0.3em] text-[#C9A227]/70">ボタンをクリックして下さい</span>
		</div>
	</main>
</div>