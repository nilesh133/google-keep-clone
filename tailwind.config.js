module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'opensans': ['Quicksand', 'sans-serif']
      },
      screens: {
        'nlg': '1320px',
        'content-bp-1': '700px',
        'content-bp-2': '1140px',
        'modal-bp-1': '385px',
        'modal-bp-2': '500px',
        'modal-bp-3': '650px',
      }
    },
  },
  plugins: [],
}
