import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		fontFamily: {
			'BlackHanSans': ['"Black Han Sans"', 'serif'] // Ensure fonts with spaces have " " surrounding it.
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [daisyui],
	daisyui: {
		darkTheme: "light",
	},
	darkMode: false
};
