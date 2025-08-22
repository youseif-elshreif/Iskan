import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "base-white": "#FFFFFF",
        "base-soft": "#F7F7F7",
        "base-beige": "#E6DCCB",
        "text-primary": "#333333",
        "text-heading": "#2C3E50",
        "accent-primary": "#3F4E65",
        "accent-secondary": "#D4C4A8",
        "border-soft": "#E6DCCB",
      },
      fontFamily: {
        arabic: ["Cairo", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
