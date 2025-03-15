/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
      animation: {
        'aurora-slow': 'aurora 15s ease infinite alternate',
        'aurora-medium': 'aurora 10s ease infinite alternate',
        'aurora-fast': 'aurora 7s ease infinite alternate',
      },
      keyframes: {
        aurora: {
          '0%': { transform: 'translate(0, 0) scale(1.0)', opacity: 0.8 },
          '50%': { transform: 'translate(5%, 5%) scale(1.1)', opacity: 0.6 },
          '100%': { transform: 'translate(-5%, -5%) scale(0.9)', opacity: 0.8 },
        },
      },
    },
  },
  plugins: [],
}