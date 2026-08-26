/**
 * Small motion helpers shared by the counter UI.
 */

function prefers_reduced_motion(): boolean {
	return (
		typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
	)
}

export function play(
	element: HTMLElement | undefined,
	keyframes: Keyframe[],
	options: KeyframeAnimationOptions,
): void {
	if (!element || prefers_reduced_motion()) return

	for (const animation of element.getAnimations()) animation.cancel()
	element.animate(keyframes, options)
}
