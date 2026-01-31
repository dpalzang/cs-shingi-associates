/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Clean, modern reading text
        serif: ['Playfair Display', 'serif'], // Luxury headings
      },
      colors: {
        // The CS Shingi Custom Palette
        gold: {
          100: '#F9F1D8', // Very light, for backgrounds
          200: '#EAD6A6',
          300: '#DEC07B',
          400: '#D4AF37', // Classic Metallic Gold
          500: '#C5A059', // The Primary Logo Color (Rich)
          600: '#A07E3E', // Darker gold for hover states
          700: '#7D602B',
          800: '#5C451D',
          900: '#3D2D12',
        },
        obsidian: {
          DEFAULT: '#050505', // Richer than pure black
          light: '#121212',   // Card backgrounds
          border: '#262626'   // Subtle borders
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #DEC07B 0%, #C5A059 50%, #A07E3E 100%)',
        'lux-dark': 'radial-gradient(circle at top right, #1a1a1a 0%, #000000 100%)',
      }
    },
  },
  plugins: [],
}