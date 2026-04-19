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
        bg:       "#080a0f",
        bg2:      "#0d1018",
        bg3:      "#111520",
        surface:  "#151a27",
        surface2: "#1c2235",
        border:   "#2a3450",
        red:      { DEFAULT: "#c0392b", bright: "#e74c3c" },
        gold:     { DEFAULT: "#d4af37", bright: "#f1c40f" },
        cyan:     "#00b4d8",
        muted:    "#7a8aaa",
        ink:      "#e8eaf0",
      },
      fontFamily: {
        display: ["Cinzel Decorative", "serif"],
        title:   ["Cinzel", "serif"],
        body:    ["Crimson Pro", "serif"],
      },
      animation: {
        "ticker":    "ticker 40s linear infinite",
        "fade-up":   "fadeUp 0.6s ease both",
        "fade-in":   "fadeIn 0.4s ease both",
        "pulse-red": "pulseRed 2s ease-in-out infinite",
      },
      keyframes: {
        ticker:   { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        fadeUp:   { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn:   { from: { opacity: "0" }, to: { opacity: "1" } },
        pulseRed: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.5" } },
      },
    },
  },
  plugins: [],
};

export default config;
