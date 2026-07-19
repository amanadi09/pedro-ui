import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@nova-ui/utils';

export type CardVariant = 'elevated' | 'outlined' | 'flat';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Removes the default padding so children (e.g. an edge-to-edge Table) can control their own spacing. */
  noPadding?: boolean;
  /** Adds hover/focus affordance styling for cards that act as click targets. Rendering an actual `<button>`/`role="button"` plus keyboard handling is still the caller's responsibility — this only supplies the visual treatment. */
  interactive?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  // Uses a border in dark mode instead of a heavier shadow — see theme/shadows.ts rationale.
  elevated: 'bg-surface shadow-sm dark:shadow-none dark:ring-1 dark:ring-border',
  outlined: 'bg-surface border border-border',
  flat: 'bg-surface-hover',
};

const CardRoot = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'elevated', noPadding = false, interactive = false, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-xl',
        variantStyles[variant],
        !noPadding && 'p-6',
        interactive &&
          'cursor-pointer transition-shadow duration-150 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
      {...rest}
    />
  );
});

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'mb-4 flex items-center justify-between gap-4 border-b border-border pb-4',
          className,
        )}
        {...rest}
      />
    );
  },
);

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardBody({ className, ...rest }, ref) {
    return <div ref={ref} className={cn('text-body text-text-primary', className)} {...rest} />;
  },
);

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'mt-4 flex items-center justify-end gap-2 border-t border-border pt-4',
          className,
        )}
        {...rest}
      />
    );
  },
);

/**
 * The base container for grouping related content — dashboards compose
 * almost everything else (StatCard, KPI widgets, list panels) on top of
 * this. Use `Card.Header` / `Card.Body` / `Card.Footer` for the common
 * three-region layout, or just pass children directly for simpler cases.
 *
 * @example
 * <Card>
 *   <Card.Header><h3 className="text-title">Revenue</h3></Card.Header>
 *   <Card.Body>$48,290 this month</Card.Body>
 *   <Card.Footer><Button size="sm" variant="ghost">View report</Button></Card.Footer>
 * </Card>
 */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
