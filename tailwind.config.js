/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Dark mode support on rakhar jonno
  theme: {
    extend: {
      colors: {
        // Tomar custom premium colors
        midnight: "#020617",
        slateCard: "rgba(30, 41, 59, 0.7)",
        electricBlue: "#3b82f6",
        premiumRed: "#dc2626",
      },
      animation: {
        // Ticker ebong sidebar er jonno custom animations
        'marquee': 'marquee 30s linear infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}