import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFFBF5",
        coral: "#FF6B6B",
        amber: "#F59E0B",
        mint: "#10B981",
        berry: "#6366F1",
        brand: {
          50: "#f4fbf8",
          100: "#dff5ec",
          500: "#2f9f78",
          600: "#23815f",
          700: "#1e674f"
        },
        ink: {
          950: "#151713",
          900: "#20251f",
          700: "#3e473e",
          500: "#657164"
        }
      },
      boxShadow: {
        soft: "0 16px 40px rgba(26, 26, 46, 0.10)",
        candy: "0 12px 32px rgba(255, 107, 107, 0.35)"
      },
      fontFamily: {
        sans: ["Nunito", "ui-rounded", "system-ui", "sans-serif"],
        display: ["Baloo 2", "Nunito", "ui-rounded", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: [typography]
};

export default config;
