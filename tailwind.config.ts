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
        bone: "#F5F0E8",
        charcoal: "#1A1815",
        ink: "#0D0B09",
        burgundy: "#722F37",
        terracotta: "#C4705A",
        ochre: "#D4A857",
        slate: "#2E2A28",
        smoke: "#8A8580",
        cream: "#FDFBF7",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        chalk: ["var(--font-caveat)", "cursive"],
      },
      transitionTimingFunction: {
        wine: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        pour: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
