/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        amber: colors.amber,
        emerald: colors.emerald,
        slate: colors.slate,
        neutral: colors.neutral,
        black: {
          900: '#161515',
          800: '#191818',
        },
        brown: {
          900: '#1E1E1E',
          600: '#312F27',
          500: '#403925',
          300: '#706856',
        },
        primary: {
          500: '#F2B33D',
          400: '#E7BC56',
          300: '#E7CE8B',
        },
      },
      fontFamily: {
        notosans: ['var(--font-notosans)', ...fontFamily.sans],
        roboto: [
          'var(--font-roboto)',
          'var(--font-notosans)',
          ...fontFamily.sans,
        ],
      },
      spacing: {},
      borderRadius: {},
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
