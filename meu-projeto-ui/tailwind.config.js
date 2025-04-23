/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/shadcn-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        laranja: '#fe5000', 
        laranjaHover: '#e94a00',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), 
  ],
};