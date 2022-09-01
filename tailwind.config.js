/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // brand: {
        //   DEFAULT: "#0080FF",
        //   dark: "#0078F0",
        //   darker: "#0070E0",
        // },
      },
      fontFamily: {
        // heading: ["'Inter var'", ...defaultTheme.fontFamily.sans],
        // sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      animation: {},
      keyframes: {},
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
}
