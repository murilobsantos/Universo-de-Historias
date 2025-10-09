/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cosmic: {
          dark: '#0F172A',
          deep: '#1E1B4B',
          purple: '#6D28D9',
          electric: '#9333EA',
          soft: '#C084FC',
        },
        primary: '#6D28D9', // cosmic purple
        secondary: '#9333EA', // electric purple
        accent: '#C084FC', // soft purple
        backgroundLight: '#FFF5F7', // light warm background
        backgroundDark: '#0F172A', // cosmic dark
        textPrimary: '#F1F5F9', // light text on dark
        textSecondary: '#CBD5E1', // secondary light text
        electricBlue: '#3B82F6',
        cyanSoft: '#22D3EE',
        magentaSoft: '#D8B4FE',
      },
      fontFamily: {
        sans: ['"Exo 2"', '"Open Sans"', 'ui-sans-serif', 'system-ui'],
        serif: ['"Merriweather"', 'serif'],
      },
      animation: {
        'bg-pulse': 'pulse 6s ease-in-out infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        borderGlow: {
          '0%, 100%': { boxShadow: '0 0 8px #3B82F6' },
          '50%': { boxShadow: '0 0 20px #D8B4FE' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
