/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./*.html",
    "./*.js"
  ],
  theme: {
    container: {
      center: true,
      padding: "20px",
    },
    extend: {},
  },
  plugins: [daisyui],
}

