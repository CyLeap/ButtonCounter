const KEY = "theme"

function create_theme() {
	let dark = $state(false)

	function apply(value: boolean) {
		dark = value
		document.documentElement.classList.toggle("dark", value)
		localStorage.setItem(KEY, value ? "dark" : "light")
	}

	return {
		get dark() {
			return dark
		},
		init() {
			const saved = localStorage.getItem(KEY)
			const prefers_dark = matchMedia("(prefers-color-scheme: dark)").matches
			apply(saved !== null ? saved === "dark" : prefers_dark)
		},
		toggle() {
			apply(!dark)
		},
	}
}

export const theme = create_theme()
