/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveUpDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        stopAnimation: {
          '0%, 100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        moveUpDown: 'moveUpDown 2s infinite',
        stopAnimation: 'stopAnimation 2s infinite',
      },
    },
  },
  variants: {
    extend: {
      animation: ['group-hover'], // Add this line to enable group-hover for animations
    },
  },
  plugins: [],
}