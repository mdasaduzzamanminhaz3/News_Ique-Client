/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 👈 এটা খুব গুরুত্বপূর্ণ
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
