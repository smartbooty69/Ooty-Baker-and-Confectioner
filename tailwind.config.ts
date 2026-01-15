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
        primary: {
          50: "#f0f2ed",
          100: "#f7f5ee",
          200: "#e8e5df",
          300: "#d4d0c7",
          400: "#b8b3a8",
          500: "#9a9588",
          600: "#7a7569",
          700: "#5a574f",
          800: "#3b3a37",
          900: "#2c2b28",
        },
        accent: {
          DEFAULT: "#4CAF50",
          dark: "#43A047",
          light: "#66BB6A",
        },
        surface: {
          DEFAULT: "#f7f5ee",
          cream: "#f7f5ee",
        },
        text: {
          dark: "#3b3a37",
          medium: "#5a574f",
          light: "#9a9588",
        },
        overlay: {
          DEFAULT: "rgba(0, 0, 0, 0.4)",
          dark: "rgba(0, 0, 0, 0.6)",
        },
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "system-ui", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        "surface": "0 4px 15px rgba(0, 0, 0, 0.08)",
        "surface-lg": "0 8px 16px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        "surface": "15px",
      },
      animation: {
        "slide-in": "slideIn 0.5s ease-out",
        "fade-in": "fadeIn 0.3s ease-in",
      },
      keyframes: {
        slideIn: {
          from: {
            transform: "translateX(100%)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
