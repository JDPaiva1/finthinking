/* eslint-env node */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vbg: {
          DEFAULT: 'var(--color-background)',
          soft: 'var(--color-background-soft)',
          mute: 'var(--color-background-mute)'
        },
        vborder: {
          DEFAULT: 'var(--color-border)',
          hover: 'var(--color-border-hover)'
        },
        vheading: 'var(--color-heading)',
        vtext: 'var(--color-text)'
      },
      transitionDuration: {
        400: '400ms'
      }
    }
  },
  plugins: []
};
