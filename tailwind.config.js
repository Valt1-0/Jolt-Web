/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#70e575",
        secondary: "#FFFFFF",
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        "bounce-slower": "bounce 3s infinite",
        "bounce-slowest": "bounce 4s infinite",
      },
    },
  },
  plugins: [],
};
