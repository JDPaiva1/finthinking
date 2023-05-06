/* eslint-env node */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: 'var(--vt-c-white)',
      black: 'var(--vt-c-black)',
      gray: {
        DEFAULT: 'var(--vt-c-gray)',
        soft: 'var(--vt-c-gray-soft)',
        mute: 'var(--vt-c-gray-mute)'
      },
      vprimary: {
        DEFAULT: 'var(--color-primary)',
        hover: 'var(--color-primary-hover)'
      },
      vexpenses: {
        DEFAULT: 'var(--color-expenses)',
        hover: 'var(--color-expenses-hover)',
        dark: 'var(--color-expenses-dark)'
      },
      vincome: {
        DEFAULT: 'var(--color-income)',
        hover: 'var(--color-income-hover)',
        dark: 'var(--color-income-dark)'
      },
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
    extend: {
      transitionDuration: {
        400: '400ms'
      }
    }
  },
  plugins: []
};
