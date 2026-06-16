/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#0b0b0d', // Base deep charcoal bg
          light: '#121215',   // Slightly lighter gray for cards/sections
          muted: '#181820',   // Intermediate container gray
          border: '#262630',  // Subtler border styling
        },
        accentViolet: {
          DEFAULT: '#8b5cf6', // Vibrant Electric Violet
          hover: '#7c3aed',   // Darker shade for buttons active/hover
          light: '#c084fc',   // Light purple for gradients or badges
          dim: 'rgba(139, 92, 246, 0.15)', // Very soft glow backdrops
        }
      }
    },
  },
  plugins: [],
}