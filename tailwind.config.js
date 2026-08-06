/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        // The product wordmark's voice. Named for the role, not the brand, so
        // a rename never has to touch every usage — as the EKAM → Bajaj One
        // one would have.
        wordmark: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        // Brand identity stays constant across themes.
        brand: {
          primary: '#1A56A8',
          light: '#EBF2FA',
          dark: '#133E82',
        },
        // Surface + text tokens are theme-aware (see CSS vars in index.css),
        // so any component using them flips automatically in dark mode.
        text: {
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
        },
        bg: {
          main: 'rgb(var(--bg-main) / <alpha-value>)',
          alt: 'rgb(var(--bg-alt) / <alpha-value>)',
        },
      },
      borderRadius: {
        card: '8px',
        btn: '6px',
        modal: '12px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.1)',
        modal: '0 4px 12px rgba(0,0,0,0.1)',
      },
      transitionDuration: {
        accordion: '200ms',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out both',
      },
    },
  },
  plugins: [],
}
