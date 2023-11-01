/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cublue': '#60A5FA',
        'cupurple': '#312e81'
      },
    },
  },
  plugins: [],
  extend: {
    fontFamily: {
      adelia: ["GEORGIA", "cursive"],
    },
  }
}