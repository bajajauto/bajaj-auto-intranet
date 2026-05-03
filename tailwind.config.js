/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        ekam: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          primary: '#1A56A8',
          light: '#EBF2FA',
          dark: '#133E82',
        },
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
        },
        bg: {
          main: '#FFFFFF',
          alt: '#F9FAFB',
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
