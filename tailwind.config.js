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
				"primary-light": "#46637E",
				"primary-base": "#FAF9F5",
				"primary-dark": "#001E35",

				"secondary-light": "#F4F4F4",
				"secondary-base": "#414042",
				"secondary-dark": "#C1C1C1",

				"accent-light": "#FF83CB",
				"accent-base": "#E0726C",
				"accent-dark": "#DE3799",
			},
			animation: {
				"fade-in": "fade-in 0.1s ease-in",
				"fade-out": "fade-out 0.1s ease-out",
				"move-down": "move-down 0.2s ease-in-out",
				"move-up": "move-up 0.2s ease-in-out",
			},
			keyframes: {
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"fade-out": {
					"0%": { opacity: "1" },
					"100%": { opacity: "0" },
				},
				"move-down": {
					"0%": { transform: "translate(0px,20px)" },
					"100%": { transform: "translate(0px,0px)" },
				},
				"move-up": {
					"0%": { transform: "translate(0px,0px)" },
					"100%": { transform: "translate(0px,20px)" },
				},
			},
			spacing: {
				72: "18rem",
			},
		},
	},
	plugins: [],
}
