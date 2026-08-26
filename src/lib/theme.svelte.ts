const KEY = "theme"

function createTheme() {
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
			const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches
			apply(saved !== null ? saved === "dark" : prefersDark)
		},
		toggle() {
			apply(!dark)
		},
	}
}

export const theme = createTheme()
