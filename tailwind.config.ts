import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#EF3E36" },   // rojo antojitos
        secondary: { DEFAULT: "#1B4965" }, // azul industrial
        accent: { DEFAULT: "#FFD166" },    // amarillo para resaltar
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
export default config;
