/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        default: '#222222',
        'light-blue': '#F1F2F3',
        'placeholder-text': '#A7B6C5',
        'footer-text': '#1E1E1E',
        'disney-blue': '#054553',
        'form-label-text': '#5B6873'
     
      },
      fontFamily: {
        'sans': ['Lato', 'sans-serif'],
      },
      fontWeight: {
        'thin': '100',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'black': '900',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addBase }) {
      addBase({
        'html': { color: '#222222' },
      })
    }
  ],
}
