import type { Config } from 'tailwindcss'

/** Meezan design tokens - see DESIGN_SYSTEM.md */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', md: '2rem', lg: '2.5rem' } },
    extend: {
      colors: {
        brand: {
          50: '#effaf5', 100: '#d7f2e5', 200: '#b1e4cd', 300: '#7fcfae', 400: '#4cb58d',
          500: '#2b9873', 600: '#207e5d', 700: '#1a654c', 800: '#17503d', 900: '#134234', 950: '#082a21',
        },
        logo: { green: '#008038', red: '#e01820' },
        accent: { 500: '#e01820', 600: '#c8141b', 700: '#a50f16' },
        gold: { 300: '#e9d8a6', 400: '#d9b96a', 500: '#c9a24a', 600: '#a8862f' },
        ivory: '#fbf8f0',
        sand: { 50: '#fbf9f4', 100: '#f6f2e8', 200: '#ece5d3', 300: '#ddd2b6' },
        ink: { 900: '#101a16', 700: '#2c3a34', 500: '#55645d', 400: '#6b7a73' },
      },
      fontFamily: {
        display: ['"Playfair Display Variable"', '"Playfair Display"', 'Georgia', 'serif'],
        arabic: ['Amiri', '"Noto Naskh Arabic"', 'serif'],
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.4rem, 7vw, 4.75rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4.6vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.6rem, 3.2vw, 2.25rem)', { lineHeight: '1.18', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        soft: '0 1px 2px rgb(16 26 22 / 0.04), 0 8px 24px -8px rgb(16 26 22 / 0.10)',
        lift: '0 2px 4px rgb(16 26 22 / 0.05), 0 22px 44px -18px rgb(16 26 22 / 0.28)',
      },
      borderRadius: { xl2: '1.25rem' },
    },
  },
  plugins: [],
} satisfies Config
