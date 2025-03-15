/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-primary',
    'bg-primary-dark',
    'bg-primary-light',
    'bg-secondary',
    'bg-secondary-dark',
    'bg-secondary-light',
    'hover:bg-primary',
    'hover:bg-primary-dark',
    'hover:bg-primary-light',
    'hover:bg-secondary',
    'hover:bg-secondary-dark',
    'hover:bg-secondary-light',
    'text-primary',
    'text-primary-dark',
    'text-primary-light',
    'text-secondary',
    'text-secondary-dark',
    'text-secondary-light',
    'hover:text-primary',
    'hover:text-primary-dark',
    'hover:text-primary-light',
    'hover:text-secondary',
    'hover:text-secondary-dark',
    'hover:text-secondary-light',
  ],
  theme: {
    extend: {
      colors: {
        // ReThink Mental Health color palette from screenshot
        primary: {
          DEFAULT: '#3D7170', // Main teal color
          dark: '#2D5554', // Darker teal for emphasis
          light: '#4A8786', // Lighter teal for hover states
        },
        secondary: {
          DEFAULT: '#F4B183', // Peach - call to actions
          dark: '#E89B69', // Darker peach for emphasis
          light: '#F7C4A2', // Lighter peach for hover states
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        success: '#2e7d32', // Green
        warning: '#ed6c02', // Amber
        error: '#d32f2f',   // Red
        info: '#0288d1',    // Blue
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}