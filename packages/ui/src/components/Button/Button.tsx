import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@pedro-ui/utils';
import type { PedroColorScheme, PedroSize } from '../../types';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment. Default `'solid'`. */
  variant?: ButtonVariant;
  /** Semantic color. Default `'primary'`. */
  colorScheme?: PedroColorScheme;
  /** Default `'md'`. */
  size?: PedroSize;
  /** Shows a spinner in place of the icon slot and disables the button, without shifting its width. */
  isLoading?: boolean;
  /** Text announced to screen readers while `isLoading` — visible label stays put so sighted users don't lose context. Default `'Loading'`. */
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const sizeStyles: Record<PedroSize, string> = {
  sm: 'h-8 px-3 text-small gap-1.5 rounded-md',
  md: 'h-10 px-4 text-small gap-2 rounded-lg',
  lg: 'h-12 px-6 text-body gap-2 rounded-lg',
};

const iconSizeStyles: Record<PedroSize, string> = {
  sm: '[&_svg]:size-4',
  md: '[&_svg]:size-4',
  lg: '[&_svg]:size-5',
};

// One row per variant, one column per colorScheme. Verbose by design — see
// packages/ui README section "Why no dynamic class construction" for why
// this isn't `bg-${colorScheme}-600` (Tailwind can't statically extract
// interpolated class names, so those utilities never ship in the built CSS).
const solidStyles: Record<PedroColorScheme, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 dark:bg-primary-500 dark:text-neutral-950 dark:hover:bg-primary-400 dark:active:bg-primary-300 focus-visible:ring-primary-500',
  secondary:
    'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 dark:bg-secondary-500 dark:text-neutral-950 dark:hover:bg-secondary-400 focus-visible:ring-secondary-500',
  success:
    'bg-success-600 text-white hover:bg-success-700 active:bg-success-800 dark:bg-success-500 dark:text-neutral-950 dark:hover:bg-success-400 focus-visible:ring-success-500',
  danger:
    'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800 dark:bg-danger-500 dark:text-neutral-950 dark:hover:bg-danger-400 focus-visible:ring-danger-500',
  warning:
    'bg-warning-500 text-neutral-950 hover:bg-warning-600 active:bg-warning-700 dark:bg-warning-500 dark:hover:bg-warning-400 focus-visible:ring-warning-500',
  info: 'bg-info-600 text-white hover:bg-info-700 active:bg-info-800 dark:bg-info-500 dark:text-neutral-950 dark:hover:bg-info-400 focus-visible:ring-info-500',
  neutral:
    'bg-neutral-800 text-white hover:bg-neutral-900 active:bg-neutral-950 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-100 focus-visible:ring-neutral-400',
};

const outlineStyles: Record<PedroColorScheme, string> = {
  primary:
    'border border-primary-300 text-primary-700 hover:bg-primary-50 active:bg-primary-100 dark:border-primary-700 dark:text-primary-300 dark:hover:bg-primary-950/40 focus-visible:ring-primary-500',
  secondary:
    'border border-secondary-300 text-secondary-700 hover:bg-secondary-50 dark:border-secondary-700 dark:text-secondary-300 dark:hover:bg-secondary-950/40 focus-visible:ring-secondary-500',
  success:
    'border border-success-300 text-success-700 hover:bg-success-50 dark:border-success-700 dark:text-success-300 dark:hover:bg-success-950/40 focus-visible:ring-success-500',
  danger:
    'border border-danger-300 text-danger-700 hover:bg-danger-50 dark:border-danger-700 dark:text-danger-300 dark:hover:bg-danger-950/40 focus-visible:ring-danger-500',
  warning:
    'border border-warning-300 text-warning-700 hover:bg-warning-50 dark:border-warning-700 dark:text-warning-300 dark:hover:bg-warning-950/40 focus-visible:ring-warning-500',
  info: 'border border-info-300 text-info-700 hover:bg-info-50 dark:border-info-700 dark:text-info-300 dark:hover:bg-info-950/40 focus-visible:ring-info-500',
  neutral:
    'border border-border-strong text-text-primary hover:bg-surface-hover focus-visible:ring-neutral-400',
};

const ghostStyles: Record<PedroColorScheme, string> = {
  primary:
    'text-primary-700 hover:bg-primary-50 dark:text-primary-300 dark:hover:bg-primary-950/40 focus-visible:ring-primary-500',
  secondary:
    'text-secondary-700 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-950/40 focus-visible:ring-secondary-500',
  success:
    'text-success-700 hover:bg-success-50 dark:text-success-300 dark:hover:bg-success-950/40 focus-visible:ring-success-500',
  danger:
    'text-danger-700 hover:bg-danger-50 dark:text-danger-300 dark:hover:bg-danger-950/40 focus-visible:ring-danger-500',
  warning:
    'text-warning-700 hover:bg-warning-50 dark:text-warning-300 dark:hover:bg-warning-950/40 focus-visible:ring-warning-500',
  info: 'text-info-700 hover:bg-info-50 dark:text-info-300 dark:hover:bg-info-950/40 focus-visible:ring-info-500',
  neutral: 'text-text-primary hover:bg-surface-hover focus-visible:ring-neutral-400',
};

const linkStyles: Record<PedroColorScheme, string> = {
  primary:
    'text-primary-600 underline-offset-4 hover:underline dark:text-primary-400 focus-visible:ring-primary-500',
  secondary:
    'text-secondary-600 underline-offset-4 hover:underline dark:text-secondary-400 focus-visible:ring-secondary-500',
  success:
    'text-success-600 underline-offset-4 hover:underline dark:text-success-400 focus-visible:ring-success-500',
  danger:
    'text-danger-600 underline-offset-4 hover:underline dark:text-danger-400 focus-visible:ring-danger-500',
  warning:
    'text-warning-600 underline-offset-4 hover:underline dark:text-warning-400 focus-visible:ring-warning-500',
  info: 'text-info-600 underline-offset-4 hover:underline dark:text-info-400 focus-visible:ring-info-500',
  neutral: 'text-text-primary underline-offset-4 hover:underline focus-visible:ring-neutral-400',
};

export const buttonVariantStyles: Record<ButtonVariant, Record<PedroColorScheme, string>> = {
  solid: solidStyles,
  outline: outlineStyles,
  ghost: ghostStyles,
  link: linkStyles,
};

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('animate-spin', className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

/**
 * The primary action trigger. Every other interactive-but-not-linkable
 * component (IconButton, Toggle groups) shares this styling matrix.
 *
 * Keyboard/a11y: renders a native `<button>`, so Space/Enter activation,
 * tab order, and `disabled` semantics all come for free. `isLoading` sets
 * `aria-busy` and swaps in an `aria-live` label rather than only changing
 * appearance, so screen reader users aren't left waiting silently.
 *
 * @example
 * <Button colorScheme="primary" leftIcon={<Plus />}>New project</Button>
 * <Button variant="outline" colorScheme="danger" isLoading loadingText="Deleting…">Delete</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'solid',
    colorScheme = 'primary',
    size = 'md',
    isLoading = false,
    loadingText = 'Loading',
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={cn(
        'relative inline-flex select-none items-center justify-center whitespace-nowrap font-medium',
        'transition-colors duration-150 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-50',
        sizeStyles[size],
        iconSizeStyles[size],
        buttonVariantStyles[variant][colorScheme],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {isLoading ? (
        <>
          <Spinner className="size-4" />
          <span>{children ?? loadingText}</span>
          <span className="sr-only" role="status" aria-live="polite">
            {loadingText}
          </span>
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
});
