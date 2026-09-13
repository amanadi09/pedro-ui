import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names conditionally (via `clsx`) and resolves conflicting
 * Tailwind utilities so the last one wins (via `tailwind-merge`) — e.g.
 * `cn('px-2', condition && 'px-4')` correctly resolves to just `px-4`
 * instead of emitting both classes and leaving the outcome to CSS source
 * order.
 *
 * Every Pedro UI component composes its className through this function, so
 * consumers can always safely override a component's default styling by
 * passing `className`.
 *
 * @example
 * cn('rounded-md px-4 py-2', isActive && 'bg-primary-600', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
