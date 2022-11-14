module.exports = {
  purge: [],
  content: ["./src/**/*.{html,js,ts}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        inter: ["Inter"],
      },
      colors:{
        'supe-green': '#8fd400',
        'supe-blue': '#002c80',
        'supe-blue-alt': '#002c80b3',
        'supe-blue-light': '#0095ff1a',
        'dfan-gris': '#343a40',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
