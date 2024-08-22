/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        green: '#66A865',
        darkgreen: '#166534',
        formtext: '#A07E53',
        customGray: '#E7E7E7',
        customWhite: 'F8F8F8',
      },
    },
    plugins: [],
  }
}
