const { fontFamily } = require("tailwindcss/defaultTheme")
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-center": "linear-gradient(var(--tw-gradient-stops))",
				"gradient-vertical":
					"linear-gradient(180deg, var(--tw-gradient-stops))",
			},
			fontFamily: {
				primary: ["var(--montserrat-font)", ...fontFamily.sans],
				serif: ["var(--montserrat-font)", ...fontFamily.serif],
				secondary: ["var(--lato-font)", ...fontFamily.sans],
			},
			colors: {
				"primary-base": "#FAF9F5",
				"secondary-base": "#414042",
				"accent-base": "#E0726C",
			},
			spacing: {
				72: "18rem",
			},
		},
	},
	plugins: [],
}
