/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors:{
        specialColor: '#00ffff',
        dull: 'var(--dull-black)',
      },
      width: {
        'container-lg': '1400px',
        'container-md': '1280px',
      },
    },
  },
  plugins: [],
}

