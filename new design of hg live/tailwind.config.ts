import { transform } from "next/dist/build/swc";
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
        background: "#1F2226",
        foreground: "#1A1D22",
        primary: "#FCAD06",
        hoverPrimary: "#FFD74D",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"], // Ensure fallback to sans-serif
        roboto: ["Roboto", "sans-serif"], // Ensure fallback to sans-serif
      },
      screens: {
        xs: "480px", // Extra small devices (mobile phones)
        sm: "640px", // Small devices (landscape phones)
        md: "768px", // Medium devices (tablets)
        lg: "1024px", // Large devices (desktops)
        xl: "1280px", // Extra large devices (large desktops)
        "2xl": "1536px", // Extra extra large devices
        "3xl": "1920px", // Ultra large devices
      },
      animations: {
        "loop-scroll": "loop-scroll 5s linear infinite",
      },
      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
