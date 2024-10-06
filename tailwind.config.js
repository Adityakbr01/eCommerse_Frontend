/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Neue: ["Neue", "sans-serif"],
        Helvetica: ["Helvetica", "sans-serif"],
        helvetica_light: ["helvetica-light", "sans-serif"],
        font3: ["Font3", "monospace"],
      },
      colors: {
        btn: {
          DEFAULT: "#27E0B3",
          font: "#000",
        },
        primary: "#1D4ED8",
        secondary: "#9333EA",
        accent: "#F59E0B",
      },
    },
  },
  plugins: [],
};
