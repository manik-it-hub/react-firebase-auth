/** @type {import('tailwindcss').Config} */
export default {
  // This 'content' array tells Tailwind where your component files are.
  // It scans these files for Tailwind class names (e.g., 'text-red-500', 'flex', 'p-4')
  // and generates only the necessary CSS.
  content: [
    "./index.html", // Your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // All JS, TS, JSX, TSX files inside the 'src' directory and its subdirectories
  ],
  theme: {
    extend: {
      // You can define custom theme values here (e.g., custom colors, fonts, spacing)
      // For example:
      // colors: {
      //   'custom-blue': '#243c5a',
      // },
      // fontFamily: {
      //   sans: ['Inter', 'sans-serif'],
      // },
    },
  },
  plugins: [],
}