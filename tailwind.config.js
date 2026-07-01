/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Calm, premium neutral + a single restrained accent.
        ink: {
          DEFAULT: '#0f172a',
          soft: '#1e293b',
        },
        brand: {
          50: '#eef4ff',
          100: '#dbe7ff',
          200: '#bccffe',
          300: '#8eabfc',
          400: '#597ef8',
          500: '#3457f1',
          600: '#2340e6',
          700: '#1c30d3',
          800: '#1d2aab',
          900: '#1d2987',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        // Used for small uppercase "system labels" — a subtle nod to the
        // Laine HQ product family, kept light and public-facing.
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 8px 24px -12px rgb(15 23 42 / 0.12)',
        lift: '0 2px 4px 0 rgb(15 23 42 / 0.04), 0 16px 40px -16px rgb(15 23 42 / 0.18)',
      },
      borderRadius: {
        xl: '0.9rem',
        '2xl': '1.25rem',
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
}
