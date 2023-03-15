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
			},
			colors: {
				primary: "#eed6c2",
				"primary-50": "#ACD2FF",
				"primary-100": "#97C7FF",
				"primary-200": "#6EB1FF",
				"primary-300": "#469BFF",
				"primary-400": "#1D85FF",
				"primary-500": "#0070f3",
				"primary-600": "#0056BB",
				"primary-700": "#003C83",
				"primary-800": "#00224B",
				"primary-900": "#000913",

				secondary: "#e39a9c",
				"secondary-50": "#FFD4B8",
				"secondary-100": "#FFC8A3",
				"secondary-200": "#FFAF7A",
				"secondary-300": "#FF9752",
				"secondary-400": "#FF7E29",
				"secondary-500": "#FF6600",
				"secondary-600": "#C75000",
				"secondary-700": "#8F3900",
				"secondary-800": "#572300",
				"secondary-900": "#1F0C00",
			},
		},
	},
	plugins: [],
}
