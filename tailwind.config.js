module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0a",
        bone: "#ecebe6"
      },
      fontFamily: {
        sans: ["'Schibsted Grotesk'", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Bodoni Moda Display'", "Didot", "Georgia", "serif"]
      }
    }
  },
  plugins: []
}