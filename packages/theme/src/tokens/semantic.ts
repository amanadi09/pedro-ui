import { neutral, primary } from './colors';

/**
 * Semantic tokens describe *role*, not color — "what is this pixel for"
 * rather than "what shade is it". These are the tokens components should
 * reach for by default; the raw `colors.ts` ramps are for the cases
 * (accents, status, data viz) where the role genuinely is "primary-600".
 *
 * Each entry documents the light and dark hex so the mapping is auditable
 * in code review, but the actual runtime values ship as CSS custom
 * properties (`css/variables.css`) so switching mode never requires a
 * re-render of computed styles — only a class toggle on <html>.
 */
export const semanticColors = {
  background: { light: neutral[50], dark: neutral[950] },
  surface: { light: '#FFFFFF', dark: neutral[900] },
  surfaceHover: { light: neutral[100], dark: neutral[800] },
  overlay: { light: 'rgba(15, 23, 42, 0.5)', dark: 'rgba(2, 6, 23, 0.7)' },

  textPrimary: { light: neutral[900], dark: neutral[50] },
  textSecondary: { light: neutral[600], dark: neutral[400] },
  textDisabled: { light: neutral[400], dark: neutral[600] },
  textOnAccent: { light: '#FFFFFF', dark: neutral[950] },

  border: { light: neutral[200], dark: neutral[800] },
  borderStrong: { light: neutral[300], dark: neutral[700] },
  focusRing: { light: primary[500], dark: primary[400] },
} as const;

export type SemanticColorToken = keyof typeof semanticColors;

/**
 * High-contrast overrides (WCAG AAA-leaning). Scoped to the tokens where
 * contrast most affects usability — body text and interactive borders —
 * rather than re-deriving all ~80 values at AAA level. Toggled via the
 * `.hc` class alongside `.dark`, see `ThemeProvider`.
 */
export const highContrastOverrides = {
  light: {
    textPrimary: '#000000',
    textSecondary: neutral[800],
    border: neutral[900],
    focusRing: primary[700],
  },
  dark: {
    textPrimary: '#FFFFFF',
    textSecondary: neutral[100],
    border: neutral[50],
    focusRing: primary[300],
  },
} as const;
