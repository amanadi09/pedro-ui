/**
 * Nova UI color tokens.
 *
 * Every semantic color family exposes a 50–900 ramp. These are the *source of
 * truth* values — `tailwind-preset.ts` re-exposes them as CSS custom
 * properties (see `../css/variables.css`) rather than static hex, so a
 * consuming product can re-theme Nova UI at runtime (e.g. white-labeling for
 * a customer) without forking or rebuilding the library.
 *
 * `neutral` doubles as the basis for the semantic surface/text/border tokens
 * in `semantic.ts` — light and dark mode pick different steps from the same
 * ramp rather than maintaining two parallel palettes.
 */

export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type ColorScheme =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'neutral';

/** Indigo — the brand accent. Chosen for the same reason Linear and Stripe
 *  lean violet/indigo: it reads as premium and technical without being cold,
 *  and it holds contrast well at both the 600 (light-mode) and 400/500
 *  (dark-mode) steps used for interactive surfaces. */
export const primary: ColorScale = {
  50: '#EEF2FF',
  100: '#E0E7FF',
  200: '#C7D2FE',
  300: '#A5B4FC',
  400: '#818CF8',
  500: '#6366F1',
  600: '#4F46E5',
  700: '#4338CA',
  800: '#3730A3',
  900: '#312E81',
};

/** Cyan — the secondary accent, used sparingly for a second point of
 *  emphasis (e.g. links inside filled primary surfaces, secondary CTAs). */
export const secondary: ColorScale = {
  50: '#ECFEFF',
  100: '#CFFAFE',
  200: '#A5F3FC',
  300: '#67E8F9',
  400: '#22D3EE',
  500: '#06B6D4',
  600: '#0891B2',
  700: '#0E7490',
  800: '#155E75',
  900: '#164E63',
};

export const success: ColorScale = {
  50: '#F0FDF4',
  100: '#DCFCE7',
  200: '#BBF7D0',
  300: '#86EFAC',
  400: '#4ADE80',
  500: '#22C55E',
  600: '#16A34A',
  700: '#15803D',
  800: '#166534',
  900: '#14532D',
};

export const danger: ColorScale = {
  50: '#FEF2F2',
  100: '#FEE2E2',
  200: '#FECACA',
  300: '#FCA5A5',
  400: '#F87171',
  500: '#EF4444',
  600: '#DC2626',
  700: '#B91C1C',
  800: '#991B1B',
  900: '#7F1D1D',
};

export const warning: ColorScale = {
  50: '#FFFBEB',
  100: '#FEF3C7',
  200: '#FDE68A',
  300: '#FCD34D',
  400: '#FBBF24',
  500: '#F59E0B',
  600: '#D97706',
  700: '#B45309',
  800: '#92400E',
  900: '#78350F',
};

export const info: ColorScale = {
  50: '#EFF6FF',
  100: '#DBEAFE',
  200: '#BFDBFE',
  300: '#93C5FD',
  400: '#60A5FA',
  500: '#3B82F6',
  600: '#2563EB',
  700: '#1D4ED8',
  800: '#1E40AF',
  900: '#1E3A8A',
};

/** Slate — desaturated cool neutral. Backbone of surfaces, borders and text
 *  in both light and dark mode. Includes 950 for dark-mode canvas, which
 *  most component-facing scales omit since it's a background-only step. */
export const neutral: ColorScale & { 950: string } = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  700: '#334155',
  800: '#1E293B',
  900: '#0F172A',
  950: '#020617',
};

export const colors = {
  primary,
  secondary,
  success,
  danger,
  warning,
  info,
  neutral,
} as const;
