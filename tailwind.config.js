/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DCDFE5",
        secondary: "#3E74F9",
        tertiary: "#ff950b",
      },
    },
  },
  plugins: [],
};
