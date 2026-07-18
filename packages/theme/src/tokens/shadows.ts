/**
 * Elevation tokens. Tinted with the neutral-900 hue at low opacity rather
 * than pure black, which reads as softer and more "premium dashboard" than
 * a flat #000 shadow. Dark mode intentionally does *not* reuse these values
 * scaled up — a black shadow is nearly invisible on a dark canvas, so dark
 * surfaces get elevation from a 1px light border plus a lighter surface
 * color instead (see `ThemeProvider` / `Card`), which is why there's no
 * `shadowsDark` export here.
 */
export const shadow = {
  xs: '0 1px 2px 0 rgb(15 23 42 / 0.04)',
  sm: '0 1px 3px 0 rgb(15 23 42 / 0.08), 0 1px 2px -1px rgb(15 23 42 / 0.08)',
  md: '0 4px 6px -1px rgb(15 23 42 / 0.08), 0 2px 4px -2px rgb(15 23 42 / 0.06)',
  lg: '0 10px 15px -3px rgb(15 23 42 / 0.08), 0 4px 6px -4px rgb(15 23 42 / 0.06)',
  xl: '0 20px 25px -5px rgb(15 23 42 / 0.10), 0 8px 10px -6px rgb(15 23 42 / 0.06)',
  '2xl': '0 25px 50px -12px rgb(15 23 42 / 0.20)',
} as const;

export type ShadowToken = keyof typeof shadow;
