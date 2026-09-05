import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "ui-sans-serif", "system-ui"],
        mono: ["Space Mono", "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          950: "#17171a",
          900: "#222225",
          800: "#343438",
          700: "#4a4a50",
          600: "#626269",
          500: "#77777f",
          400: "#9999a0",
          300: "#bdbdc2",
          200: "#dedee2",
          100: "#ededee",
        },
      },
    },
  },
  plugins: [],
};

export default config;
