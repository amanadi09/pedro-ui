import { forwardRef, type ButtonHTMLAttributes, type ReactElement } from 'react';
import { cn } from '@nova-ui/utils';
import type { NovaColorScheme, NovaSize } from '../../types';
import { buttonVariantStyles, type ButtonVariant } from '../Button/Button';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Required — IconButton has no visible text, so this is its only accessible name. */
  'aria-label': string;
  icon: ReactElement;
  variant?: ButtonVariant;
  colorScheme?: NovaColorScheme;
  size?: NovaSize;
  isLoading?: boolean;
  /** Renders as a circle instead of a rounded square. Default `false`. */
  isRound?: boolean;
}

const squareSizeStyles: Record<NovaSize, string> = {
  sm: 'size-8 rounded-md [&_svg]:size-4',
  md: 'size-10 rounded-lg [&_svg]:size-4',
  lg: 'size-12 rounded-lg [&_svg]:size-5',
};

/**
 * A Button with no visible label, sized square (or round via `isRound`) so
 * the icon is centered with equal padding on every side. Shares
 * `Button`'s exact variant/colorScheme styling — see that component for
 * the "why not dynamic classes" rationale.
 *
 * a11y: `aria-label` is a required prop (not optional) precisely because
 * an icon-only button is invisible to screen readers without one — this
 * is enforced at the type level, not just documented.
 *
 * @example
 * <IconButton aria-label="Delete item" icon={<Trash2 />} colorScheme="danger" variant="ghost" />
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    icon,
    variant = 'solid',
    colorScheme = 'primary',
    size = 'md',
    isLoading = false,
    isRound = false,
    disabled,
    className,
    type = 'button',
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={cn(
        'relative inline-flex shrink-0 select-none items-center justify-center',
        'transition-colors duration-150 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-50',
        squareSizeStyles[size],
        isRound && 'rounded-full',
        buttonVariantStyles[variant][colorScheme],
        className,
      )}
      {...rest}
    >
      {isLoading ? (
        <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        icon
      )}
    </button>
  );
});
