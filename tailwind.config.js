/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff69b4',
        secondary: '#ff1493',
        'pink-light': '#ffc0cb',
      }
    },
  },
  plugins: [],
}

