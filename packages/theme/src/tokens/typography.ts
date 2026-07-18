/**
 * Typography tokens.
 *
 * Font stack: Inter for UI text — the same family Linear, Vercel and Notion
 * ship with their dashboards, chosen for its tall x-height and tight numeral
 * spacing, both of which matter in dense data tables. JetBrains Mono covers
 * code/data cells where tabular alignment matters. Both are loaded as
 * variable fonts by the consuming app (see apps/docs/index.html); Nova UI
 * itself only ships the stack/metrics, not the font files.
 */
export const fontFamily = {
  sans: [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  mono: [
    'JetBrains Mono',
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Consolas',
    'Liberation Mono',
    'monospace',
  ],
} as const;

export type TypographyVariant =
  | 'display'
  | 'heading'
  | 'subheading'
  | 'title'
  | 'body'
  | 'small'
  | 'caption'
  | 'label'
  | 'code';

type TypeStyle = {
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing?: string;
  fontFamily: 'sans' | 'mono';
};

/** The full semantic type scale. Sizes/line-heights follow a 4px rhythm so
 *  every variant lands on the same baseline grid as the spacing scale. */
export const typeScale: Record<TypographyVariant, TypeStyle> = {
  display: { fontSize: '3rem', lineHeight: '3.5rem', fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'sans' },
  heading: { fontSize: '2rem', lineHeight: '2.5rem', fontWeight: 700, letterSpacing: '-0.015em', fontFamily: 'sans' },
  subheading: { fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 600, letterSpacing: '-0.01em', fontFamily: 'sans' },
  title: { fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: 600, fontFamily: 'sans' },
  body: { fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 400, fontFamily: 'sans' },
  small: { fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: 400, fontFamily: 'sans' },
  caption: { fontSize: '0.75rem', lineHeight: '1rem', fontWeight: 400, fontFamily: 'sans' },
  label: { fontSize: '0.8125rem', lineHeight: '1rem', fontWeight: 500, letterSpacing: '0.01em', fontFamily: 'sans' },
  code: { fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: 400, fontFamily: 'mono' },
};
