/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Aqui você pode adicionar cores customizadas do Yu-Gi-Oh! futuramente
      colors: {
        yugi: {
          gold: '#D4AF37',
          dark: '#121212',
          card: '#2c2c2c',
        }
      }
    },
  },
  plugins: [],
}