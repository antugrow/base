const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				nunito: ["Nunito", "sans-serif"],
			},
		},
	},
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				antugrow: {
					extend: "light",
					colors: {
						primary: {
							50: "#e5f6ff",
							100: "#c5e0eb",
							200: "#a4c9db",
							300: "#82b4cb",
							400: "#609ebb",
							500: "#4785a2",
							600: "#35677f",
							700: "#244a5b",
							800: "#122c39",
							900: "#001117",
							DEFAULT: "#437487",
							foreround: "#ffffff",
						},
						secondary: {
							50: "#fff3dc",
							100: "#fedcb2",
							200: "#f9c684",
							300: "#f6af56",
							400: "#f29827",
							500: "#d87e0d",
							600: "#a86207",
							700: "#794603",
							800: "#4a2900",
							900: "#1d0c00",
							DEFAULT: "#d87e0d",
							foreround: "#ffffff",
						},
					},
				},
			},
		}),
	],
};
