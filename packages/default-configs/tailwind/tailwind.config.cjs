/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../apps/todo/src/pages/**/*.{js,ts,jsx,tsx}',
    '../../apps/todo/src/components/**/*.{js,ts,jsx,tsx}',
    '../../packages/@erikdadoka/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
};
