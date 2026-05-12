/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans Arabic', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        brand: {
          50: '#eef4ff', 100: '#dbe6ff', 200: '#bcd1ff', 300: '#93b3ff',
          400: '#618bff', 500: '#3b65f5', 600: '#2549e0', 700: '#1f3bbb',
          800: '#1f3393', 900: '#1f2f73', 950: '#141d4a',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      boxShadow: {
        glow: '0 0 0 3px hsl(var(--ring) / 0.30)',
        card: '0 8px 28px hsl(var(--foreground) / 0.06), 0 2px 6px hsl(var(--foreground) / 0.04)',
        soft: '0 20px 56px hsl(var(--foreground) / 0.10), 0 6px 16px hsl(var(--foreground) / 0.06)',
      },
      keyframes: {
        'accordion-down': { from: { height: 0 }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: 0 } },
        'fade-in':   { from: { opacity: 0 }, to: { opacity: 1 } },
        'fade-up':   { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        'slide-in':  { from: { opacity: 0, transform: 'translateY(-4px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        'shimmer':   { '0%':{backgroundPosition:'-200% 0'}, '100%':{backgroundPosition:'200% 0'} },
        'pulse-ring':{ '0%':{boxShadow:'0 0 0 0 hsl(var(--primary) / 0.5)'}, '100%':{boxShadow:'0 0 0 12px hsl(var(--primary) / 0)'} },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'fade-in':   'fade-in 220ms cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-up':   'fade-up 380ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in':  'slide-in 220ms cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer':   'shimmer 2.4s linear infinite',
        'pulse-ring':'pulse-ring 1.6s cubic-bezier(0.16, 1, 0.3, 1) infinite',
      },
      backgroundImage: {
        'grid-light': "linear-gradient(to right, hsl(var(--border) / 0.4) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.4) 1px, transparent 1px)",
        'mesh-brand': "radial-gradient(at 20% 0%, hsl(220 90% 65% / 0.15) 0%, transparent 50%), radial-gradient(at 80% 0%, hsl(190 90% 55% / 0.10) 0%, transparent 50%), radial-gradient(at 0% 100%, hsl(260 90% 65% / 0.10) 0%, transparent 50%)",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
