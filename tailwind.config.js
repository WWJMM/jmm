/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'quantum-blue': '#00E5FF',
        'lattice-purple': '#7B61FF',
        'plasma-pink': '#FF2A6D',
        'deep-space': '#0F172A',
        'dark-matter': '#050A18',
        'lab-green': '#00FF9C',
        'element-gold': '#FFD700',
        'success': '#10B981',
        'warning': '#FBBF24',
        'error': '#EF4444',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'exo': ['Exo 2', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 229, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 229, 255, 0.8)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-blue': '0 0 5px rgba(0, 229, 255, 0.5), 0 0 20px rgba(0, 229, 255, 0.3)',
        'neon-purple': '0 0 5px rgba(123, 97, 255, 0.5), 0 0 20px rgba(123, 97, 255, 0.3)',
        'neon-pink': '0 0 5px rgba(255, 42, 109, 0.5), 0 0 20px rgba(255, 42, 109, 0.3)',
      },
    },
  },
  plugins: [],
};