/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#121212',
        bg2: '#1E1E1E',
        card: '#1A1A1A',
        teal: {
          DEFAULT: '#00A39A',
          dim: '#0A6E6E',
        },
        coral: {
          DEFAULT: '#FF6B5C',
          dim: '#E5512F',
        },
        sand: '#E8D5A3',
        cream: '#F5F0E8',
        muted: '#9A938A',
        flag: {
          red: '#C10000',
        },
      },
      fontFamily: {
        heading: ['Anton', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
