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
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: "#0762C8",
        success: "#008A63",
        warning: "#FBA13A",
        sale: "#FC185B",

        accent: {
          1: "#328985",
          2: "#434655"
        },

        passive: "#A0A3BD",
        'bg-accent': "#328985",
        border: "#E5E5E5",
        tab: "#f2f3f5",

        'blue-shade': {
          1: "#F4F8FB",
          2: "#E8F0F7"
        },

        white: "#ffffff",
        black: "#161616",
      },
      fontFamily: {
        'inter': ['var(--font-inter)', 'sans-serif'],
        'rubik': ['var(--font-rubik)', 'sans-serif'],
      },
      fontSize: {
        'h1': ['64px', { lineHeight: '80px', fontWeight: '700' }],
        'h2': ['40px', { lineHeight: '52px', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '33px', fontWeight: '700' }],

        'body-price': ['18px', { lineHeight: '26px', fontWeight: '800' }],
        'body-brand': ['16px', { lineHeight: '23px', fontWeight: '600' }],
        'body-description': ['14px', { lineHeight: '23px', fontWeight: '500' }],

        'small': ['12px', { lineHeight: '19px', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};
export default config;