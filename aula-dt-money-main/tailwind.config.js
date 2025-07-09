/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f0f2f5",
        "input-border": "#d7d7d7",
        "text-title": "#363f5f",
        "text-input": "#969cb3",
        "modal": "#f0f2f5",
        header: "#5429cc",
        income: "#33cc95",
        outcome: "#e52e4d",
        button: "#6933ff",
        table: "#969cb3",
        "table-header": "#969cb3",
        primary: "#8257e6",
        transaction: {
          border: "#d7d7d7",
        },
      },
    },
  },
  plugins: [],
}
