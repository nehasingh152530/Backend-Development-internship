/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 40px -16px rgba(15, 23, 42, 0.25)',
        glow: '0 0 0 1px rgba(99, 102, 241, 0.15), 0 14px 30px -12px rgba(99, 102, 241, 0.4)',
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
      },
      backgroundImage: {
        'premium-grid':
          'radial-gradient(circle at 15% 15%, rgba(99,102,241,0.14), transparent 35%), radial-gradient(circle at 85% 5%, rgba(14,165,233,0.15), transparent 42%), radial-gradient(circle at 50% 90%, rgba(236,72,153,0.08), transparent 38%)',
      },
    },
  },
  plugins: [],
}
