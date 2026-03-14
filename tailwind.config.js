/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f8f8f1",
          100: "#efeedf",
          200: "#e0ddbf",
          300: "#c9c28f",
          400: "#b1a65e",
          500: "#98853f",
          600: "#7d6b33",
          700: "#65552c",
          800: "#534629",
          900: "#483d27"
        },
        ink: "#121212",
        sand: "#f7f4ec",
        clay: "#8b7355"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(18, 18, 18, 0.08)"
      },
      backgroundImage: {
        "hero-pattern":
          "radial-gradient(circle at top left, rgba(201, 194, 143, 0.35), transparent 36%), radial-gradient(circle at bottom right, rgba(83, 70, 41, 0.18), transparent 28%)"
      }
    }
  },
  plugins: []
};
