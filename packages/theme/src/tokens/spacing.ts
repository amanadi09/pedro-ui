/**
 * Spacing tokens on a strict 4px scale, as specified. The key numbers map
 * 1:1 to Tailwind's own default spacing scale (space[4] === Tailwind's
 * `4` === 1rem), so component code can use either `space.4` (when doing
 * arithmetic / non-Tailwind contexts like inline SVG) or the `p-4` utility
 * interchangeably — they always agree.
 */
export const space = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  24: '96px',
} as const;

export type SpaceToken = keyof typeof space;
