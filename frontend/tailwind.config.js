/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B1320',
          accent: '#CFA73A',
          'accent-hover': '#E8B93C',
        },
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(11, 19, 32, 0.08), 0 4px 16px -4px rgba(11, 19, 32, 0.06)',
        'soft-lg': '0 8px 24px -4px rgba(11, 19, 32, 0.08), 0 16px 48px -8px rgba(11, 19, 32, 0.06)',
        'glow-accent': '0 0 20px -4px rgba(207, 167, 58, 0.35), 0 10px 25px -5px rgba(207, 167, 58, 0.15)',
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [],
}
