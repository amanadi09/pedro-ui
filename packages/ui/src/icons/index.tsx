import { forwardRef } from 'react';
import type { LucideIcon, LucideProps } from 'lucide-react';

/**
 * Pedro UI ships icons via `lucide-react` directly rather than vendoring or
 * re-exporting the full ~1500-icon set under a brand-specific name — that
 * would be a large, high-churn surface to keep in sync for little benefit,
 * since `lucide-react` is already tree-shakeable per-icon.
 *
 * `withPedroIconDefaults` is the one thing actually worth standardizing:
 * consistent default `size`/`strokeWidth` so icons dropped into Button,
 * IconButton, Input adornments, etc. all read as the same visual weight
 * without every call site repeating `size={16} strokeWidth={2}`.
 *
 * @example
 * import { Plus } from 'lucide-react';
 * const PedroPlus = withPedroIconDefaults(Plus);
 * <PedroPlus /> // size 16, strokeWidth 2 by default, still overridable
 */
export function withPedroIconDefaults(Icon: LucideIcon) {
  return forwardRef<SVGSVGElement, LucideProps>(function PedroIcon(props, ref) {
    return <Icon ref={ref} size={16} strokeWidth={2} {...props} />;
  });
}

export type { LucideIcon, LucideProps } from 'lucide-react';
