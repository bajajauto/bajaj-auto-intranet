/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Hanken Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
        // Headlines and big numerals: a tight grotesk set large with negative
        // tracking, against Hanken for everything else.
        display: ['Bricolage Grotesque', 'Hanken Grotesk', 'system-ui', 'sans-serif'],
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
        // Page surfaces. The page sits on a cool grey `canvas`; cards are
        // `surface`; `chip` is the pill and well fill; `line` the hairline.
        // All theme-aware, so a card built from these needs no dark remap.
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        chip: 'rgb(var(--chip) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        // Fixed in both themes: the navy of the utility bar and the feature
        // cards, and the two accents eyebrows are set in.
        navy: '#0E1B2E',
        accent: {
          orange: '#C2410C',
          green: '#0F7A4D',
        },
      },
      borderRadius: {
        card: '8px',
        btn: '6px',
        modal: '12px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.1)',
        soft: '0 1px 2px rgba(15,22,32,0.04), 0 8px 24px rgba(15,22,32,0.06)',
        lifted: '0 2px 4px rgba(15,22,32,0.05), 0 18px 40px rgba(15,22,32,0.12)',
        search: '0 1px 2px rgba(15,22,32,0.04), 0 10px 30px rgba(15,22,32,0.07)',
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
