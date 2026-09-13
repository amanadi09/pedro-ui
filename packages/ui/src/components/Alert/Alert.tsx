import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { cn } from '@pedro-ui/utils';
import { IconButton } from '../IconButton';

export type AlertStatus = 'success' | 'danger' | 'warning' | 'info';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  status?: AlertStatus;
  title?: ReactNode;
  /** Called when the built-in dismiss button is clicked. Omit to render a non-dismissible alert. */
  onDismiss?: () => void;
  /** Replace the default status icon, or pass `false` to omit the icon entirely. */
  icon?: ReactNode | false;
}

const statusStyles: Record<AlertStatus, string> = {
  success:
    'bg-success-50 text-success-900 border-success-200 dark:bg-success-950/40 dark:text-success-200 dark:border-success-900',
  danger:
    'bg-danger-50 text-danger-900 border-danger-200 dark:bg-danger-950/40 dark:text-danger-200 dark:border-danger-900',
  warning:
    'bg-warning-50 text-warning-900 border-warning-200 dark:bg-warning-950/40 dark:text-warning-200 dark:border-warning-900',
  info: 'bg-info-50 text-info-900 border-info-200 dark:bg-info-950/40 dark:text-info-200 dark:border-info-900',
};

const iconColor: Record<AlertStatus, string> = {
  success: 'text-success-600 dark:text-success-400',
  danger: 'text-danger-600 dark:text-danger-400',
  warning: 'text-warning-600 dark:text-warning-400',
  info: 'text-info-600 dark:text-info-400',
};

const defaultIcon: Record<AlertStatus, ReactNode> = {
  success: <CheckCircle2 />,
  danger: <XCircle />,
  warning: <AlertTriangle />,
  info: <Info />,
};

/**
 * An inline, persistent status message — for transient notifications use
 * Toast/Snackbar instead; Alert stays in the page flow (form validation
 * summaries, banner warnings, empty-state hints).
 *
 * a11y: renders `role="alert"` for `danger`/`warning` (assertive — screen
 * readers interrupt to announce it immediately, appropriate for things
 * that block progress) and `role="status"` for `success`/`info`
 * (polite — announced without interrupting). This mirrors how ARIA live
 * regions are meant to be triaged by urgency, not just presence.
 *
 * @example
 * <Alert status="danger" title="Payment failed" onDismiss={() => setShow(false)}>
 *   Your card was declined. Please try a different payment method.
 * </Alert>
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { status = 'info', title, onDismiss, icon, className, children, ...rest },
  ref,
) {
  const resolvedIcon = icon === false ? null : (icon ?? defaultIcon[status]);

  return (
    <div
      ref={ref}
      role={status === 'danger' || status === 'warning' ? 'alert' : 'status'}
      aria-live={status === 'danger' || status === 'warning' ? 'assertive' : 'polite'}
      className={cn('flex gap-3 rounded-lg border p-4 text-small', statusStyles[status], className)}
      {...rest}
    >
      {resolvedIcon && (
        <span
          className={cn('mt-0.5 shrink-0 [&_svg]:size-5', iconColor[status])}
          aria-hidden="true"
        >
          {resolvedIcon}
        </span>
      )}
      <div className="min-w-0 flex-1">
        {title && <p className="font-medium">{title}</p>}
        {children && <div className={cn(title && 'mt-1', 'opacity-90')}>{children}</div>}
      </div>
      {onDismiss && (
        <IconButton
          aria-label="Dismiss"
          icon={<X />}
          onClick={onDismiss}
          variant="ghost"
          colorScheme="neutral"
          size="sm"
          className="-mr-1 -mt-1 shrink-0 text-current hover:bg-black/5 dark:hover:bg-white/10"
        />
      )}
    </div>
  );
});
