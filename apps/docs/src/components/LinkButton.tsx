import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '@pedro-ui/utils';
import { buttonVariantStyles, type ButtonVariant } from '@pedro-ui/react';
import type { PedroColorScheme, PedroSize } from '@pedro-ui/react';

export interface LinkButtonProps extends LinkProps {
  variant?: ButtonVariant;
  colorScheme?: PedroColorScheme;
  size?: PedroSize;
}

const sizeStyles: Record<PedroSize, string> = {
  sm: 'h-8 px-3 text-small gap-1.5 rounded-md',
  md: 'h-10 px-4 text-small gap-2 rounded-lg',
  lg: 'h-12 px-6 text-body gap-2 rounded-lg',
};

/**
 * Docs-site-only helper: an in-app navigation link that's visually
 * identical to `Button`. Not part of the `@pedro-ui/react` public API —
 * Button intentionally stays a plain `<button>` (nesting `<Link>`'s `<a>`
 * inside it would be invalid, non-interactive-in-interactive HTML), so
 * apps that need a "looks like a button, navigates like a link" affordance
 * build a thin wrapper like this one against their own router, exactly as
 * done here.
 */
export function LinkButton({
  variant = 'solid',
  colorScheme = 'primary',
  size = 'md',
  className,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      className={cn(
        'inline-flex select-none items-center justify-center whitespace-nowrap font-medium',
        'transition-colors duration-150 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        sizeStyles[size],
        buttonVariantStyles[variant][colorScheme],
        className,
      )}
      {...rest}
    />
  );
}
