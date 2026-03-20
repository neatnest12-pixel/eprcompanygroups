/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: "#0B5D3B"
        },
        accent: "#16A34A"
      },
      boxShadow: {
        luxe: "0 24px 60px rgba(0, 0, 0, 0.25)"
      }
    }
  },
  plugins: []
};
