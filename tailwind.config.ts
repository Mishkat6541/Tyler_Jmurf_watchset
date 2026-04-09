import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-black':    '#0C0A07',
        'brand-charcoal': '#1A1612',
        'brand-surface':  '#231E18',
        'brand-border':   '#332B22',
        'brand-ivory':    '#F2EDE4',
        'brand-ivory-dark': '#E5DED2',
        'brand-gold':     '#9B7B38',
        'brand-gold-light': '#B8944A',
        'brand-muted':    '#6B6055',
        'brand-light':    '#A09080',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(6px)' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)' },
          to:   { transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeInUp:      'fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        fadeIn:        'fadeIn 1s ease forwards',
        shimmer:       'shimmer 3s linear infinite',
        scrollBounce:  'scrollBounce 1.5s ease-in-out infinite',
        slideInRight:  'slideInRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
      },
    },
  },
  plugins: [],
}

export default config
