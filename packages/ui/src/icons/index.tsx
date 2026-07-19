import { forwardRef } from 'react';
import type { LucideIcon, LucideProps } from 'lucide-react';

/**
 * Nova UI ships icons via `lucide-react` directly rather than vendoring or
 * re-exporting the full ~1500-icon set under a Nova-specific name — that
 * would be a large, high-churn surface to keep in sync for little benefit,
 * since `lucide-react` is already tree-shakeable per-icon.
 *
 * `withNovaIconDefaults` is the one thing actually worth standardizing:
 * consistent default `size`/`strokeWidth` so icons dropped into Button,
 * IconButton, Input adornments, etc. all read as the same visual weight
 * without every call site repeating `size={16} strokeWidth={2}`.
 *
 * @example
 * import { Plus } from 'lucide-react';
 * const NovaPlus = withNovaIconDefaults(Plus);
 * <NovaPlus /> // size 16, strokeWidth 2 by default, still overridable
 */
export function withNovaIconDefaults(Icon: LucideIcon) {
  return forwardRef<SVGSVGElement, LucideProps>(function NovaIcon(props, ref) {
    return <Icon ref={ref} size={16} strokeWidth={2} {...props} />;
  });
}

export type { LucideIcon, LucideProps } from 'lucide-react';
