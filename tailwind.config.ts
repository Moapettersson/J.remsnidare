

import type { Config } from "tailwindcss";


export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        inter: ["Inter", "sans-serif"],
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui'],
        logo: ["Rousseau Deco", "serif"],
        montserrat: ['Montserrat', 'ui-sans-serif', 'system-ui'],
        
      },
      colors: {
        text: "#200f04",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "#200f04",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "#200f04",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      backgroundImage: {
        "gradient-leather": "var(--gradient-leather)",
        "gradient-warm": "var(--gradient-warm)", 
        "gradient-hero": "var(--gradient-hero)",
      },
      boxShadow: {
        craft: "var(--shadow-craft)",
        elegant: "var(--shadow-elegant)",
        subtle: "var(--shadow-subtle)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
