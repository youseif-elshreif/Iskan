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
        "primary-bg": "#F7F7F7",
        "secondary-bg": "#E6DCCB",
        "primary-text": "#333333",
        heading: "#6B4F3D",
        "accent-primary": "#A8C686",
        "accent-secondary": "#E3B7A0",
      },
      fontFamily: {
        arabic: ["Cairo", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
