import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@pedro-ui/utils';
import type { PedroColorScheme, PedroSize } from '../../types';

export type BadgeVariant = 'solid' | 'subtle' | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  colorScheme?: PedroColorScheme;
  size?: Extract<PedroSize, 'sm' | 'md'>;
  /** Renders a small leading dot instead of/alongside text — common for status ("Online", "Degraded"). */
  withDot?: boolean;
}

const sizeStyles: Record<'sm' | 'md', string> = {
  sm: 'h-5 px-2 text-caption gap-1',
  md: 'h-6 px-2.5 text-small gap-1.5',
};

const solid: Record<PedroColorScheme, string> = {
  primary: 'bg-primary-600 text-white dark:bg-primary-500 dark:text-neutral-950',
  secondary: 'bg-secondary-600 text-white dark:bg-secondary-500 dark:text-neutral-950',
  success: 'bg-success-600 text-white dark:bg-success-500 dark:text-neutral-950',
  danger: 'bg-danger-600 text-white dark:bg-danger-500 dark:text-neutral-950',
  warning: 'bg-warning-500 text-neutral-950',
  info: 'bg-info-600 text-white dark:bg-info-500 dark:text-neutral-950',
  neutral: 'bg-neutral-700 text-white dark:bg-neutral-300 dark:text-neutral-900',
};

const subtle: Record<PedroColorScheme, string> = {
  primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300',
  secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/40 dark:text-secondary-300',
  success: 'bg-success-100 text-success-800 dark:bg-success-900/40 dark:text-success-300',
  danger: 'bg-danger-100 text-danger-800 dark:bg-danger-900/40 dark:text-danger-300',
  warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900/40 dark:text-warning-300',
  info: 'bg-info-100 text-info-800 dark:bg-info-900/40 dark:text-info-300',
  neutral: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
};

const outline: Record<PedroColorScheme, string> = {
  primary:
    'border border-primary-300 text-primary-700 dark:border-primary-700 dark:text-primary-300',
  secondary:
    'border border-secondary-300 text-secondary-700 dark:border-secondary-700 dark:text-secondary-300',
  success:
    'border border-success-300 text-success-700 dark:border-success-700 dark:text-success-300',
  danger: 'border border-danger-300 text-danger-700 dark:border-danger-700 dark:text-danger-300',
  warning:
    'border border-warning-300 text-warning-700 dark:border-warning-700 dark:text-warning-300',
  info: 'border border-info-300 text-info-700 dark:border-info-700 dark:text-info-300',
  neutral: 'border border-border-strong text-text-secondary',
};

const dotColor: Record<PedroColorScheme, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  warning: 'bg-warning-500',
  info: 'bg-info-500',
  neutral: 'bg-neutral-500',
};

const variantStyles: Record<BadgeVariant, Record<PedroColorScheme, string>> = {
  solid,
  subtle,
  outline,
};

/**
 * A small status/category label. `subtle` (tinted background, no border)
 * is the default treatment for the common "status pill" use case —
 * `solid` is reserved for badges that need to compete visually with a
 * Button nearby, and `outline` for dense tables where a filled badge per
 * row feels heavy.
 *
 * Renders a `<span>`, not a `<button>` — Badge is not interactive. If you
 * need a clickable/removable tag, use Chip (Data Display) instead.
 *
 * @example
 * <Badge colorScheme="success" withDot>Active</Badge>
 * <Badge variant="solid" colorScheme="danger">3 errors</Badge>
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = 'subtle',
    colorScheme = 'neutral',
    size = 'md',
    withDot = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex w-fit items-center rounded-full font-medium leading-none',
        sizeStyles[size],
        variantStyles[variant][colorScheme],
        className,
      )}
      {...rest}
    >
      {withDot && (
        <span
          className={cn('size-1.5 shrink-0 rounded-full', dotColor[colorScheme])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
});
