/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor : {
        default : '#041014'
      },
      textColor : {
        default : '#ffffff'
      }
    },
  },
  plugins: [],
}