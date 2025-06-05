/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],

  // Configuración del modo oscuro para evitar conflictos
  darkMode: 'class',

   theme: {
    extend: {
      // 🎨 Paleta de Colores Ambrosía
      colors: {
        ambrosia: {
          // Dorados principales
          'gold': '#d4af37',
          'gold-light': '#f3e5ab',
          'gold-bright': '#ffd700',
          'gold-dark': '#b8860b',
          
          // Bronces y cobres
          'bronze': '#cd7f32',
          'bronze-light': '#daa520',
          'bronze-dark': '#8b4513',
          
          // Fondos oscuros
          'dark-primary': '#2d1810',
          'dark-secondary': '#1a0f0a',
          'dark-accent': '#0f0604',
          'dark-light': '#3d2817',
          
          // Cremas y beiges
          'cream': '#f5f5dc',
          'cream-dark': '#f3e5ab',
          'beige': '#f7f3e9',
        },
        // Alias para facilidad de uso
        primary: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047', // amber-300
          400: '#f59e0b', // amber-400 - Principal
          500: '#d97706', // amber-500 - Intenso
          600: '#b45309', // amber-600 - Bronce
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
          950: '#1c0a00',
        },
        secondary: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c', // stone-700 - Oscuro claro
          800: '#292524', // stone-800 - Oscuro medio
          900: '#1c1917', // stone-900 - Oscuro principal
          950: '#0c0a09',
        }
      },
      
      // 🖋️ Tipografías
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'crimson': ['Crimson Text', 'serif'],
        // Fallbacks para React Native
        'display': ['Cinzel', 'serif'],
        'body': ['Crimson Text', 'serif'],
      },
      
      // 🎨 Gradientes personalizados (limitados en React Native)
      backgroundImage: {
        'gradient-ambrosia': 'linear-gradient(135deg, #2d1810, #1a0f0a, #0f0604)',
        'gradient-gold': 'linear-gradient(135deg, #d4af37, #b8860b)',
        'gradient-bronze': 'linear-gradient(135deg, #cd7f32, #8b4513)',
        'gradient-mystical': 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(184, 134, 11, 0.1))',
      },
      
      // 📐 Espaciado personalizado
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      
      // 🎭 Animaciones personalizadas (limitadas en React Native)
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'mystical': 'mystical 3s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' },
        },
        mystical: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
      },
      
      // 🎯 Sombras personalizadas (limitadas en React Native)
      boxShadow: {
        'mystical': '0 4px 15px rgba(212, 175, 55, 0.2)',
        'mystical-lg': '0 10px 25px rgba(212, 175, 55, 0.3)',
        'inner-glow': 'inset 0 2px 4px rgba(212, 175, 55, 0.1)',
        'gold': '0 4px 15px rgba(255, 215, 0, 0.3)',
      },
      
      // 📱 Dimensiones para móvil
      maxWidth: {
        'mobile': '428px',
        'tablet': '834px',
      },
      
      // 🎨 Opacidades personalizadas
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '85': '0.85',
      },
      
      // 📐 Border radius personalizados
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      
      // 🎯 Z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
}