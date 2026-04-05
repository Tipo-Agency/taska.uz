/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
    './routes/**/*.{js,ts,jsx,tsx}',
    './config/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2C7E20',
          dark: '#1e5c15',
          light: '#4ade80',
          glow: '#2C7E20',
        },
        ink: {
          DEFAULT: '#0f172a',
          muted: '#475569',
          subtle: '#64748b',
        },
        canvas: {
          DEFAULT: '#fafafa',
          elevated: '#ffffff',
        },
        surface: {
          900: '#ffffff',
          800: '#f4f4f5',
          700: '#e4e4e7',
          glass: 'rgba(255, 255, 255, 0.78)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(15, 23, 42, 0.06), 0 8px 24px -6px rgba(15, 23, 42, 0.06)',
        'soft-lg': '0 4px 16px -4px rgba(15, 23, 42, 0.08), 0 16px 40px -12px rgba(15, 23, 42, 0.1)',
        nav: '0 8px 32px -12px rgba(15, 23, 42, 0.1), 0 2px 8px -2px rgba(15, 23, 42, 0.04)',
        dropdown: '0 16px 48px -12px rgba(15, 23, 42, 0.14), 0 4px 16px -4px rgba(15, 23, 42, 0.06)',
        glow: '0 8px 32px -4px rgba(44, 126, 32, 0.22)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(44, 126, 32, 0.09) 0%, transparent 55%)',
        'mesh-canvas':
          'radial-gradient(at 0% 0%, rgba(44, 126, 32, 0.06) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(15, 23, 42, 0.04) 0px, transparent 45%)',
      },
    },
  },
  plugins: [],
};
