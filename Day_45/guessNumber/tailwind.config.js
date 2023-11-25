import { nextui } from "@nextui-org/react";
import twScrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    twScrollbar({ nocompatible: true }),
    nextui({
      themes: {
        light: {
          colors: {
            background: {
              DEFAULT: "#ffffff",
              foreground: "#319795",
            },
            default: {
              DEFAULT: "#ffffff",
              foreground: "#319795",
              100: "#ffffff",
            },
            primary: {
              DEFAULT: "#319795",
              foreground: "#ffffff",
              700: "#285e61",
              200: "#319795",
            },
          },
        },
        dark: {
          colors: {
            default: {
              100: "#1A202C",
            },
            background: {
              DEFAULT: "#1A202C",
              foreground: "#ffffff",
            },
            primary: {
              DEFAULT: "#319795",
              foreground: "#000000",
              700: "#285e61",
              200: "#81e6d9",
            },
            content1: {
              DEFAULT: "#1A202C",
              // DEFAULT: '#2D3748',
            },
            foreground: {
              DEFAULT: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};
