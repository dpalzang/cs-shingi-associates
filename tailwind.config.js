/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        gold: {
          100: '#F9F1D8', 
          200: '#EAD6A6',
          300: '#DEC07B',
          400: '#D4AF37', 
          500: '#C5A059', 
          600: '#A07E3E', 
          700: '#7D602B',
          800: '#5C451D',
          900: '#3D2D12',
        },
        obsidian: {
          DEFAULT: '#050505',
          light: '#121212',   
          border: '#262626'  
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