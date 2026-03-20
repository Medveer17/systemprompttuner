import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0b",
        foreground: "#e4e4e7",
        // This matches the neon green from your screenshot
        brand: {
          DEFAULT: "#99ff80",
          hover: "#b2ff99",
        },
      },
    },
  },
  plugins: [],
};
export default config;
