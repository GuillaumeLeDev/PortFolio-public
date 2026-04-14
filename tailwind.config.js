/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'subtle-bg': '#f5f5f5', 
        'subtle-text': '#333333',
      }
    },
  },
  plugins: [],
}   