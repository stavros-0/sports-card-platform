/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './src/**/*.{js,ts,jsx,tsx}',
      './public/index.html',
  ],
  theme: {
      extend: {
        colors: {
          navy:{
            800: '#0A192F',
          }
        }
      },
  },
  plugins: [],
};

