/**
 * Border radius tokens. Kept modest across the board (Pedro UI's brief calls
 * for a Linear/Stripe-like precision rather than the fully-rounded "soft"
 * aesthetic) — the largest non-"full" step is 16px, reserved for large
 * surfaces like modals and cards, not buttons or inputs.
 */
export const radius = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
} as const;

export type RadiusToken = keyof typeof radius;
