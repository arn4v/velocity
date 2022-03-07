const colors = require("tailwindcss/colors");

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				...colors,
			},
		},
	},
	plugins: [],
};
