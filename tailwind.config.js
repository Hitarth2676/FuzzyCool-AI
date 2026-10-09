/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#02070e',
        darkCard: '#070f1e',
        darkCardBg: 'rgba(7, 16, 30, 0.85)',
        cardBorder: 'rgba(26, 54, 93, 0.45)',
        cardBorderLight: 'rgba(56, 189, 248, 0.25)',
        cyanAccent: '#28b8ff',
        cyanGlow: '#00f0ff',
        purpleAccent: '#a45cff',
        purpleGlow: '#c084fc',
        orangeAccent: '#ff9d3d',
        redAccent: '#ff3b3b',
        greenOnline: '#00ff9d',
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'cyan-glow-sm': '0 0 10px rgba(40, 184, 255, 0.35)',
        'cyan-glow': '0 0 20px rgba(40, 184, 255, 0.5)',
        'cyan-glow-lg': '0 0 35px rgba(40, 184, 255, 0.7)',
        'purple-glow': '0 0 20px rgba(164, 92, 255, 0.5)',
        'orange-glow': '0 0 20px rgba(255, 157, 61, 0.5)',
        'red-glow': '0 0 25px rgba(255, 59, 59, 0.55)',
        'panel': '0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(56, 189, 248, 0.15)',
        'panel-inner': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-medium': 'spin 4s linear infinite',
        'spin-fast': 'spin 1.5s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-bubble': 'bubble 4s ease-in-out infinite',
      },
      keyframes: {
        bubble: {
          '0%': { transform: 'translateY(100%) scale(0.8)', opacity: '0.2' },
          '50%': { transform: 'translateY(40%) scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'translateY(0%) scale(0.7)', opacity: '0.1' },
        }
      }
    },
  },
  plugins: [],
}
