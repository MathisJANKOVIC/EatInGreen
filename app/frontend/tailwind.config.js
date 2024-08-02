/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: '#66A865',
        darkgreen: '#166534',
        formtext: '#A07E53',
      },
    },
    plugins: [],
  }
};
