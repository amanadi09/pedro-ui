import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';
import { fontFamily, typeScale } from './tokens/typography';
import { space } from './tokens/spacing';
import { radius } from './tokens/radius';

/** Wraps a CSS variable channel triplet in Tailwind's opacity-aware `rgb()`
 *  form, e.g. `withOpacity('--color-primary-600')` → usable as `bg-primary-600/50`. */
function withOpacity(variable: string) {
  return `rgb(var(${variable}) / <alpha-value>)`;
}

function colorRamp(name: string) {
  return {
    50: withOpacity(`--color-${name}-50`),
    100: withOpacity(`--color-${name}-100`),
    200: withOpacity(`--color-${name}-200`),
    300: withOpacity(`--color-${name}-300`),
    400: withOpacity(`--color-${name}-400`),
    500: withOpacity(`--color-${name}-500`),
    600: withOpacity(`--color-${name}-600`),
    700: withOpacity(`--color-${name}-700`),
    800: withOpacity(`--color-${name}-800`),
    900: withOpacity(`--color-${name}-900`),
  };
}

/**
 * Shared Tailwind preset. Any app or package that renders Pedro UI components
 * should extend this in its own tailwind.config so the JIT scanner picks up
 * class names used inside `packages/ui` even when that app doesn't author
 * them directly:
 *
 * ```ts
 * import pedroPreset from '@pedro-ui/theme/tailwind-preset';
 * export default { presets: [pedroPreset], content: [...] };
 * ```
 */
const pedroPreset: Partial<Config> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colorRamp('primary'),
        secondary: colorRamp('secondary'),
        success: colorRamp('success'),
        danger: colorRamp('danger'),
        warning: colorRamp('warning'),
        info: colorRamp('info'),
        neutral: { ...colorRamp('neutral'), 950: withOpacity('--color-neutral-950') },

        background: withOpacity('--color-background'),
        surface: withOpacity('--color-surface'),
        'surface-hover': withOpacity('--color-surface-hover'),
        overlay: withOpacity('--color-overlay'),

        'text-primary': withOpacity('--color-text-primary'),
        'text-secondary': withOpacity('--color-text-secondary'),
        'text-disabled': withOpacity('--color-text-disabled'),
        'text-on-accent': withOpacity('--color-text-on-accent'),

        border: withOpacity('--color-border'),
        'border-strong': withOpacity('--color-border-strong'),
        'focus-ring': withOpacity('--color-focus-ring'),
      },
      fontFamily: {
        sans: [...fontFamily.sans],
        mono: [...fontFamily.mono],
      },
      fontSize: {
        display: [
          typeScale.display.fontSize,
          {
            lineHeight: typeScale.display.lineHeight,
            letterSpacing: typeScale.display.letterSpacing,
            fontWeight: typeScale.display.fontWeight.toString(),
          },
        ],
        heading: [
          typeScale.heading.fontSize,
          {
            lineHeight: typeScale.heading.lineHeight,
            letterSpacing: typeScale.heading.letterSpacing,
            fontWeight: typeScale.heading.fontWeight.toString(),
          },
        ],
        subheading: [
          typeScale.subheading.fontSize,
          {
            lineHeight: typeScale.subheading.lineHeight,
            letterSpacing: typeScale.subheading.letterSpacing,
            fontWeight: typeScale.subheading.fontWeight.toString(),
          },
        ],
        title: [
          typeScale.title.fontSize,
          {
            lineHeight: typeScale.title.lineHeight,
            fontWeight: typeScale.title.fontWeight.toString(),
          },
        ],
        body: [typeScale.body.fontSize, { lineHeight: typeScale.body.lineHeight }],
        small: [typeScale.small.fontSize, { lineHeight: typeScale.small.lineHeight }],
        caption: [typeScale.caption.fontSize, { lineHeight: typeScale.caption.lineHeight }],
        label: [
          typeScale.label.fontSize,
          {
            lineHeight: typeScale.label.lineHeight,
            letterSpacing: typeScale.label.letterSpacing,
            fontWeight: typeScale.label.fontWeight.toString(),
          },
        ],
        code: [typeScale.code.fontSize, { lineHeight: typeScale.code.lineHeight }],
      },
      spacing: Object.fromEntries(Object.entries(space).map(([k, v]) => [k, v])),
      borderRadius: {
        xs: radius.xs,
        sm: radius.sm,
        md: radius.md,
        lg: radius.lg,
        xl: radius.xl,
        '2xl': radius['2xl'],
        full: radius.full,
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
      },
      keyframes: {
        'pedro-fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'pedro-fade-out': { from: { opacity: '1' }, to: { opacity: '0' } },
        'pedro-scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'pedro-slide-up': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pedro-fade-in': 'pedro-fade-in 150ms ease-out',
        'pedro-fade-out': 'pedro-fade-out 120ms ease-in',
        'pedro-scale-in': 'pedro-scale-in 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'pedro-slide-up': 'pedro-slide-up 200ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default pedroPreset;
