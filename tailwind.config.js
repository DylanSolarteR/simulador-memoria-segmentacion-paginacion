/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg); background-color:red;" },
        },
        redfade: {
          "0%, 100%": { transform: "background-color:transparent;" },
          "50%": { transform: "background-color:red;" },
        },
        greenfade: {
          "0%, 100%": { transform: "background-color:transparent;" },
          "50%": { transform: "background-color:green;" },
        },
      },
      animation: {
        wiggle: "wiggle 300ms ease-in-out",
        greenfade: "greenfade 500ms ease-in-out",
        redfade: "redfade 500ms ease-in-out",
      },
    },
  },
  plugins: [],
};
