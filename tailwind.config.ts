import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172026",
        sea: "#0f766e",
        skyglass: "#e7f4f8",
        sun: "#f59e0b"
      }
    }
  },
  plugins: []
};

export default config;
