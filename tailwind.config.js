/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#111111',
          cream: '#F7F3EB',
          gold: '#C8A45D',
          'gold-hover': '#b5934f',
          'gold-light': '#F4EEDB',
          white: '#FFFFFF',
          muted: '#777777',
          border: '#EAE6DF',
          surface: '#FAFAF7',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(17, 17, 17, 0.08)',
        'luxury-hover': '0 20px 40px -15px rgba(17, 17, 17, 0.15)',
        'gold-glow': '0 0 25px rgba(200, 164, 93, 0.25)',
      }
    },
  },
  plugins: [],
}
