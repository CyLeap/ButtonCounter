<script lang="ts">
	import { enhance } from '$app/forms';

	let { onReset }: { onReset: (count: number) => void } = $props();

	let dialog: HTMLDialogElement | undefined;
	let resetError = $state<string | null>(null);
</script>

<button
	type="button"
	onclick={() => dialog?.showModal()}
	class="touch-manipulation rounded-lg border border-[#BE3144]/50 bg-[#FDF4F2] px-5 py-2 font-['Noto_Sans_JP'] text-xs font-bold tracking-[0.2em] text-[#BE3144] transition-colors duration-150 hover:bg-[#BE3144]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE3144] sm:px-6 sm:text-sm"
>
	リセット
</button>

<dialog
	bind:this={dialog}
	onclick={(event) => {
		if (event.target === dialog) dialog?.close();
	}}
	class="m-auto w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-[#C9A227]/40 bg-white p-6 shadow-2xl backdrop:bg-black/40 sm:p-8"
>
	<p class="font-['Noto_Sans_JP'] text-sm text-[#1B2A4A] sm:text-base">
		カウントを 0 に戻しますか？
	</p>

	{#if resetError}
		<p class="mt-2 text-sm text-red-600">{resetError}</p>
	{/if}

	<div class="mt-6 flex justify-end gap-3">
		<button
			type="button"
			onclick={() => dialog?.close()}
			class="rounded-lg px-5 py-2 font-['Noto_Sans_JP'] text-sm text-[#1B2A4A]/70 transition-colors duration-150 hover:bg-black/5"
		>
			キャンセル
		</button>

		<form
			method="POST"
			action="?/reset"
			use:enhance={() => {
				resetError = null;
				return async ({ result }) => {
					if (result.type === 'success') {
						onReset((result.data as { count: number }).count);
						dialog?.close();
					} else if (result.type === 'failure') {
						resetError =
							(result.data as { error?: string } | undefined)?.error ??
							'Reset failed. Please try again.';
					}
				};
			}}
		>
			<button
				type="submit"
				class="rounded-lg bg-[#BE3144] px-5 py-2 font-['Noto_Sans_JP'] text-sm font-bold text-white transition-colors duration-150 hover:bg-[#A32739]"
			>
				リセット
			</button>
		</form>
	</div>
</dialog>
