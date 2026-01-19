import { nextui } from "@nextui-org/react";
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif-main)'],
        sans: ['var(--font-sans-main)'],
      },
      keyframes: {
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.6)' },
          '60%': { opacity: '1', transform: 'scale(1.15)' },
          '80%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        floatPlayful1: {
          '0%': { transform: 'translate(0, 0) rotate(-6deg)' },
          '25%': { transform: 'translate(8px, -6px) rotate(-2deg)' },
          '50%': { transform: 'translate(0, -12px) rotate(-6deg)' },
          '75%': { transform: 'translate(-8px, -6px) rotate(-10deg)' },
          '100%': { transform: 'translate(0, 0) rotate(-6deg)' },
        },
        floatPlayful2: {
          '0%': { transform: 'translate(0, 0) rotate(4deg)' },
          '25%': { transform: 'translate(-6px, 6px) rotate(8deg)' },
          '50%': { transform: 'translate(6px, 12px) rotate(2deg)' },
          '75%': { transform: 'translate(-4px, 6px) rotate(6deg)' },
          '100%': { transform: 'translate(0, 0) rotate(4deg)' },
        },
      },
      animation: {
        popIn: 'popIn 0.7s ease-out both',
        floatPlayful1: 'floatPlayful1 6s ease-in-out infinite',
        floatPlayful2: 'floatPlayful2 7s ease-in-out infinite',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

export default config