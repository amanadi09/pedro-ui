import { forwardRef, useState, type HTMLAttributes } from 'react';
import { cn } from '@pedro-ui/utils';
import type { PedroColorScheme } from '../../types';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  src?: string;
  /** Used for the <img> alt text and, when no `name`/src, to derive fallback initials. */
  name?: string;
  size?: AvatarSize;
  /** Background for the fallback-initials state. Default `'neutral'`. Ignored once an image loads. */
  colorScheme?: PedroColorScheme;
  status?: AvatarStatus;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: 'size-6 text-caption',
  sm: 'size-8 text-caption',
  md: 'size-10 text-small',
  lg: 'size-12 text-body',
  xl: 'size-16 text-title',
};

const statusSizeStyles: Record<AvatarSize, string> = {
  xs: 'size-1.5',
  sm: 'size-2',
  md: 'size-2.5',
  lg: 'size-3',
  xl: 'size-3.5',
};

const statusColor: Record<AvatarStatus, string> = {
  online: 'bg-success-500',
  offline: 'bg-neutral-400',
  away: 'bg-warning-500',
  busy: 'bg-danger-500',
};

const fallbackBg: Record<PedroColorScheme, string> = {
  primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300',
  secondary: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/50 dark:text-secondary-300',
  success: 'bg-success-100 text-success-700 dark:bg-success-900/50 dark:text-success-300',
  danger: 'bg-danger-100 text-danger-700 dark:bg-danger-900/50 dark:text-danger-300',
  warning: 'bg-warning-100 text-warning-700 dark:bg-warning-900/50 dark:text-warning-300',
  info: 'bg-info-100 text-info-700 dark:bg-info-900/50 dark:text-info-300',
  neutral: 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200',
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const initials =
    parts.length === 1
      ? parts[0]?.slice(0, 2)
      : `${parts[0]?.[0] ?? ''}${parts[parts.length - 1]?.[0] ?? ''}`;
  return (initials ?? '').toUpperCase();
}

/**
 * A user/entity avatar: shows `src` when it loads successfully, and falls
 * back to initials derived from `name` if `src` is missing or fails to
 * load (broken URL, 404, offline). The fallback is automatic — you don't
 * need to pre-check whether the image exists.
 *
 * a11y: the image gets `alt={name}`; the fallback-initials state carries
 * the same accessible name via `aria-label` on the wrapping `<span>`, so
 * screen readers announce the person's name either way, not "AB".
 *
 * @example
 * <Avatar src={user.avatarUrl} name={user.fullName} status="online" />
 * <Avatar name="Ada Lovelace" colorScheme="primary" /> {/* renders "AL" *\/}
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, name = '', size = 'md', colorScheme = 'neutral', status, className, ...rest },
  ref,
) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = !!src && !imageFailed;

  return (
    <span
      ref={ref}
      className={cn('relative inline-flex shrink-0', className)}
      aria-label={!showImage ? name : undefined}
      {...rest}
    >
      <span
        className={cn(
          'flex select-none items-center justify-center overflow-hidden rounded-full font-medium',
          sizeStyles[size],
          !showImage && fallbackBg[colorScheme],
        )}
      >
        {showImage ? (
          <img
            src={src}
            alt={name}
            className="size-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span aria-hidden="true">{name ? getInitials(name) : '?'}</span>
        )}
      </span>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-surface',
            statusSizeStyles[size],
            statusColor[status],
          )}
          aria-hidden="true"
        />
      )}
    </span>
  );
});
