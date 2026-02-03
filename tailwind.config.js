const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'whatsapp-green': '#25D366',
        'blue-gray': colors.slate,
        'wild-orange': '#d97706',
        'wild-orange-dark': '#b45309',
        'wild-orange-light': '#fa8500',
      },
      inset: {
        '1/2': '50%',
      },
    },
    fontFamily: {
      display: ['Montserrat', 'sans-serif'],
      serif: ['Nunito', 'sans-serif'],
      sans: ['Nunito', 'sans-serif'],
    },
    minWidth: {
      0: '0',
      '1/2': '50%',
      full: '100%',
    },
  },
  content: [
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  plugins: [require('@tailwindcss/forms')],
}
