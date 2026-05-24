/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0a0a0a',
          surface: '#f7f7f7',
          border: '#e8e8e8',
          muted: '#8a8a8a',
          accent: '#1a1a1a',
        },
        phase: {
          build: '#0a0a0a',
          sharpen: '#c2820a',
          peak: '#c0392b',
          rest: '#9ca3af',
        },
      },
      fontFamily: {
        sans: ['System'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
