import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#091929',
        header: '#0f172a',
        card: '#142f4c',
        primary: '#2563eb', // Azul vibrante para botões, links, destaques
        secondary: '#ef4444', // Vermelho pipoca para ações importantes
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px', // seu limite de largura que definimos
        },
      },
      animation: {
        fade: 'fadeInOut 1s ease-in-out',
      },
      keyframes: {
        fadeInOut: {
          '0%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};

export default config;
