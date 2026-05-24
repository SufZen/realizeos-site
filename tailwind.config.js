/** ============================================================================
 *  realizeos-site · tailwind.config.js
 *  Adapter: keeps the existing class names (brand-yellow, bg-elevated, etc.)
 *  but points every value at the shared --rz-* tokens. Drop this file in
 *  the realizeos-site repo to replace the current tailwind.config.js.
 *  ========================================================================= */
/** @type {import('tailwindcss').Config} */
export default {
  // [data-mode="dark"] becomes the single source of truth for dark mode.
  // (the existing .dark class continues to work — see tokens.css)
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        xs:   'var(--rz-radius-xs)',
        sm:   'var(--rz-radius-sm)',
        md:   'var(--rz-radius-md)',
        lg:   'var(--rz-radius-lg)',
        xl:   'var(--rz-radius-xl)',
        full: 'var(--rz-radius-full)',
      },
      colors: {
        // ── shadcn-compatible names · re-pointed at --rz-* ──────────────
        background:  'var(--rz-bg)',
        foreground:  'var(--rz-fg)',
        card: {
          DEFAULT:    'var(--rz-bg-raised)',
          foreground: 'var(--rz-fg)',
        },
        popover: {
          DEFAULT:    'var(--rz-bg-sunken)',
          foreground: 'var(--rz-fg)',
        },
        primary: {
          DEFAULT:    'var(--rz-accent)',
          foreground: 'var(--rz-accent-fg)',
        },
        secondary: {
          DEFAULT:    'var(--rz-surface)',
          foreground: 'var(--rz-fg)',
        },
        muted: {
          DEFAULT:    'var(--rz-bg-sunken)',
          foreground: 'var(--rz-fg-muted)',
        },
        accent: {
          DEFAULT:    'var(--rz-bg-sunken)',
          foreground: 'var(--rz-fg)',
        },
        destructive: {
          DEFAULT:    'var(--rz-danger)',
          foreground: '#ffffff',
        },
        border: 'var(--rz-border)',
        input:  'var(--rz-surface)',
        ring:   'var(--rz-accent)',

        // ── chart palette (kept; tinted toward brand) ───────────────────
        chart: {
          1: 'var(--rz-accent)',
          2: 'var(--rz-info)',
          3: 'var(--rz-success)',
          4: 'var(--rz-warning)',
          5: 'var(--rz-danger)',
        },

        // ── Legacy site names · still resolve to the same tokens ────────
        'brand-yellow':       'var(--rz-accent)',
        'brand-yellow-hover': 'var(--rz-accent-strong)',
        'bg-elevated':        'var(--rz-bg-sunken)',
        'bg-card-hover':      'var(--rz-surface-hover)',
        'text-secondary':     'var(--rz-fg-muted)',
        'text-muted-custom':  'var(--rz-fg-subtle)',
        surface:              'var(--rz-surface)',

        // ── Semantic status colors · resolve to --rz-* tokens ───────────
        success:       'var(--rz-success)',
        'success-soft': 'var(--rz-success-soft)',
        warning:       'var(--rz-warning)',
        'warning-soft': 'var(--rz-warning-soft)',
        danger:        'var(--rz-danger)',
        'danger-soft':  'var(--rz-danger-soft)',
        info:          'var(--rz-info)',
        'info-soft':    'var(--rz-info-soft)',
      },
      fontFamily: {
        sans:    ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        hebrew:  ['Rubik',   'Poppins', '-apple-system', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['Poppins', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      keyframes: {
        // Re-exported from @realizeos/design-system/keyframes.css under
        // shadcn-compatible names, so existing Radix accordions keep working.
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        'fade-up':  { from: { opacity: '0', transform: 'translateY(20px)' },
                      to:   { opacity: '1', transform: 'translateY(0)' } },
        'fade-in':  { from: { opacity: '0' }, to: { opacity: '1' } },
        'popup-in': { from: { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
                      to:   { opacity: '1', transform: 'scale(1) translateY(0)' } },
        'float':      { '0%, 100%': { transform: 'translateY(0)' },
                        '50%':      { transform: 'translateY(-6px)' } },
        'float-slow': { '0%, 100%': { transform: 'translateY(0)' },
                        '50%':      { transform: 'translateY(-4px)' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'fade-up':        'fade-up 0.5s var(--rz-ease-out) forwards',
        'fade-in':        'fade-in 0.5s var(--rz-ease-out) forwards',
        'popup-in':       'popup-in 0.3s var(--rz-ease-out) forwards',
        'float':          'float 4s ease-in-out infinite',
        'float-slow':     'float-slow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
