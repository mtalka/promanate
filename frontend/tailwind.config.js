/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        '90s-small': '2px 4px 0px 0px rgba(0, 0, 0, 1)',
        '90s-large': '3px 6px 0px 0px rgba(0, 0, 0, 1)',
      }
    },
  },
  plugins: [],
}

