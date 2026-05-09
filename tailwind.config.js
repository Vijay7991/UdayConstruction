/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#E86A1A', // primary orange
          50:  '#FFF3EA',
          100: '#FFE0C7',
          200: '#FFC08F',
          300: '#FFA057',
          400: '#F5821F',
          500: '#E86A1A',
          600: '#C5560E',
          700: '#9B420A',
          800: '#722F07',
          900: '#4A1E04',
        },
        navy: {
          DEFAULT: '#1A1A2E',
          50:  '#E7E7EE',
          100: '#C7C7D5',
          200: '#9090AB',
          300: '#5C5C7E',
          400: '#33334F',
          500: '#1A1A2E',
          600: '#141425',
          700: '#0E0E1B',
          800: '#080812',
          900: '#040409',
        },
        gold: {
          DEFAULT: '#F5C518',
          50:  '#FEF8DD',
          100: '#FDEFB1',
          200: '#FBE066',
          300: '#F8D139',
          400: '#F5C518',
          500: '#D6A90A',
          600: '#A88607',
          700: '#7A6105',
          800: '#4D3D03',
          900: '#211A01',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(26, 26, 46, 0.12)',
        cta: '0 8px 24px -8px rgba(232, 106, 26, 0.6)',
      },
      animation: {
        'pulse-ring': 'pulseRing 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up': 'fadeUp 0.6s ease-out',
      },
      keyframes: {
        pulseRing: {
          '0%':   { transform: 'scale(0.9)', opacity: '0.7' },
          '70%':  { transform: 'scale(1.4)', opacity: '0' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      maxWidth: {
        '7xl': '80rem',
      },
    },
  },
  plugins: [],
};
