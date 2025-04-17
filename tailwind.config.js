/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./context/*/.{js,ts,jsx,tsx}",
      "./components/*/.{js,ts,jsx,tsx}",
      "./views/*/.{js,ts,jsx,tsx}", 
    ],
    theme: {
      extend: {
        colors: {
          brand: "#3B8668", 
        },
        fontFamily: {
          sans: ["var(--font-geist-sans)", "sans-serif"],
          mono: ["var(--font-geist-mono)", "monospace"],
        },
      },
    },
    plugins: [],
  };