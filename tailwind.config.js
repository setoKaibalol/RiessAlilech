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
			textShadow: {
				"primary-base": "0px 4px 4px rgba(0, 0, 0, 0.25)",
				"secondary-base": "0px 4px 4px rgba(0, 0, 0, 0.25)",
				"accent-base": "0px 4px 4px rgba(0, 0, 0, 0.25)",
			},

			colors: {
				"primary-base": "#FAF9F5",
				"secondary-base": "#414042",
				"accent-base": "#E0726C",
			},
			animation: {
				"fade-in": "fade-in 0.1s ease-in",
				"fade-out": "fade-out 0.1s ease-out",
				"move-down": "move-down 0.2s ease-in-out",
				"move-up": "move-up 0.2s ease-in-out",
				"ping-new": "load 1s cubic-bezier(0, 0, 0.2, 1) infinite",
				"open-mobile-menu": "open-mobile-menu 0.3s ease-in-out forwards",
				"close-mobile-menu": "close-mobile-menu 0.3s ease-in-out forwards",
				"scroll-icon-fade-in": "scroll-icon-fade-in 0.2s ease-in-out forwards",
				"scroll-icon-fade-out":
					"scroll-icon-fade-out 0.2s ease-in-out forwards",
				fly: "fly 5s ease-in-out infinite",
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
				"open-mobile-menu": {
					"0%": { transform: "scalex(0)", opacity: 0 },
					"100%": { transform: "scalex(1)", opacity: 100 },
				},
				"close-mobile-menu": {
					"0%": { transform: "scalex(1)", opacity: 100 },
					"100%": { transform: "scalex(0)", opacity: 0 },
				},
				"scroll-icon-fade-in": {
					"0%": { opacity: 0 },
					"100%": { opacity: 100 },
				},
				"scroll-icon-fade-out": {
					"0%": { opacity: 100 },
					"50%": { opacity: 50 },
					"100%": { opacity: 0 },
				},
				fly: {
					"0%": { transform: "translateY(100%) scale(0.5)", opacity: "0" },
					"100%": { transform: "translateY(-100%) scale(1)", opacity: "1" },
				},
			},
			spacing: {
				72: "18rem",
			},
		},
	},
	plugins: [],
}
