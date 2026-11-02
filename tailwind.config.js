/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // The ocean redesign sets everything, headings included, in Inter.
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
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
        // The ocean redesign: deep teal-navy through steel blue to mist. The
        // sidebar, stat bar and primary buttons run 950 → 600; cards and
        // panels sit on the pale end.
        ocean: {
          950: '#052E42',
          900: '#09344B',
          800: '#0B364A',
          700: '#1D6885',
          600: '#2188A9',
          500: '#5684A5',
          400: '#65A1BB',
          300: '#93C3D7',
          200: '#C2D5E4',
          100: '#E1EFF8',
          50: '#F6FBFF',
          ink: '#03122B',
          head: '#012A40',
          sub: '#405557',
          line: '#DBE9E7',
        },
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
        // The redesign's raised card: a firm drop plus a soft halo.
        ocean: '0 5px 11px rgba(20,45,45,0.42), 0 0 9px rgba(20,45,45,0.22)',
        'ocean-sm': '0 3px 8px rgba(40,70,120,0.10)',
        'ocean-tile': '0 4px 4px rgba(20,28,45,0.5), 0 0 6px rgba(20,28,45,0.22)',
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
