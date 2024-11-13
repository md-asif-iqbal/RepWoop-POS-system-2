// tailwind.config.js

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'], // Add the Nunito font
      },
      colors: {
        background: "var(--background)", // Define background color
        foreground: "var(--foreground)", // Define foreground color
      },
    },
  },
  darkMode: 'class', // Enable dark mode support
  plugins: [
    require('daisyui'), // Add DaisyUI plugin
    require('tailwind-scrollbar'), // Add scrollbar plugin
  ],
};
