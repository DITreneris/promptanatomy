/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        label: ['10px', { lineHeight: '1.25' }],
      },
      colors: {
        brand: {
          dark: '#0B1320',
          accent: '#CFA73A',
          'accent-hover': '#E8B93C',
        },
        ecosystem: {
          1: '#2E9E7E',
          2: '#7C5CFF',
          3: '#3F6FFF',
          4: '#F38A3F',
        },
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #CFA73A 0%, #E8B93C 100%)',
        'cta-gradient': 'linear-gradient(135deg, #ffcc33 0%, #ffb300 100%)',
        'hero-bg': 'radial-gradient(circle at 50% 20%, rgba(255, 196, 0, 0.12), transparent 60%), linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)',
        'ecosystem-center-glow': 'radial-gradient(circle at 50% 10%, rgba(255, 190, 0, 0.18), transparent 60%)',
        'pricing-section': 'linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)',
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(11, 19, 32, 0.08), 0 4px 16px -4px rgba(11, 19, 32, 0.06)',
        'soft-lg': '0 8px 24px -4px rgba(11, 19, 32, 0.08), 0 16px 48px -8px rgba(11, 19, 32, 0.06)',
        'glow-accent': '0 0 20px -4px rgba(207, 167, 58, 0.35), 0 10px 25px -5px rgba(207, 167, 58, 0.15)',
        'soft-top': '0 -4px 12px -4px rgba(11, 19, 32, 0.06)',
        'cta-shadow': '0 6px 14px rgba(255, 179, 0, 0.3)',
        'stat-card': '0 10px 25px rgba(0, 0, 0, 0.05)',
        'methodology-card': '0 10px 30px rgba(0, 0, 0, 0.05)',
        'ecosystem-card-hover': '0 20px 50px rgba(0, 0, 0, 0.35)',
        'ecosystem-cta': '0 6px 18px rgba(255, 193, 7, 0.35)',
        'ecosystem-icon-glow': '0 0 0 6px rgba(255, 193, 7, 0.05), 0 0 30px rgba(255, 193, 7, 0.15)',
        'ecosystem-icon-depth': '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
        'ecosystem-icon-card': '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 0 0 6px rgba(255, 193, 7, 0.05), 0 0 30px rgba(255, 193, 7, 0.15)',
        'ecosystem-card-rim': '0 0 30px rgba(255, 200, 0, 0.15)',
        'pricing-card': '0 20px 40px rgba(0, 0, 0, 0.06)',
        'pricing-cta': '0 8px 20px rgba(255, 193, 7, 0.35)',
      },
      dropShadow: {
        'logo-glow': '0 0 6px rgba(255, 196, 0, 0.4)',
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [],
}
