/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed', // violet-600
        secondary: '#2dd4bf', // teal-400
        bgDark: '#0b0f19',
        bgCard: 'rgba(20, 25, 40, 0.7)',
        bgLight: '#f8fafc',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
