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
        brand: {
          blue: "#1E3A5F",
          gold: "#C9A24A",
          green: "#2E7D32",
          surface: "#F5F7FA",
          text: "#1A1A1A",
          muted: "#6B7280"
        }
      },
      boxShadow: {
        luxe: "0 24px 60px rgba(30, 58, 95, 0.14)"
      }
    }
  },
  plugins: []
};
