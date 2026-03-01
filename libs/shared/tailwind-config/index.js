/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3358AE',
          50:  '#F3F6FC',
          100: '#E3E9F7',
          200: '#C0CDED',
          300: '#90A8DF',
          400: '#5D7FD0',
          500: '#416AC8',
          600: '#3358AE',
          700: '#29488E',
          800: '#1F366B',
          900: '#152447',
        },
        secondary: {
          DEFAULT: '#99ABD7',
          50:  '#F4F6FB',
          100: '#E5EAF5',
          200: '#C4CEE8',
          300: '#99ABD7',
          400: '#6C85C6',
          500: '#4767B8',
          600: '#3C579A',
          700: '#31467D',
          800: '#25365F',
          900: '#1A2542',
        },
        accent: {
          DEFAULT: '#97DBD9',
          50:  '#F4FBFB',
          100: '#E4F6F5',
          200: '#C2EAE9',
          300: '#97DBD9',
          400: '#67CBC8',
          500: '#41BEBA',
          600: '#37A09C',
          700: '#2C817E',
          800: '#226361',
          900: '#174443',
        },
        // Semantic surface / neutral tokens
        surface: {
          DEFAULT: '#FFFFFF',
          muted:   '#F9FAFB',
          subtle:  '#F3F4F6',
        },
      },
    },
  },
  plugins: [],
};
