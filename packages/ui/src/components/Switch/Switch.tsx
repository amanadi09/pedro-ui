import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@pedro-ui/utils';
import type { PedroColorScheme, PedroSize } from '../../types';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  /** Places the label before the switch instead of after. Default `false`. */
  labelPosition?: 'start' | 'end';
  size?: PedroSize;
  colorScheme?: PedroColorScheme;
}

const trackSize: Record<PedroSize, string> = {
  sm: 'h-5 w-9',
  md: 'h-6 w-11',
  lg: 'h-7 w-[3.25rem]',
};

const thumbSize: Record<PedroSize, string> = {
  sm: 'size-3.5 peer-checked:translate-x-4',
  md: 'size-4 peer-checked:translate-x-5',
  lg: 'size-5 peer-checked:translate-x-6',
};

const trackChecked: Record<PedroColorScheme, string> = {
  primary: 'peer-checked:bg-primary-600 dark:peer-checked:bg-primary-500',
  secondary: 'peer-checked:bg-secondary-600 dark:peer-checked:bg-secondary-500',
  success: 'peer-checked:bg-success-600 dark:peer-checked:bg-success-500',
  danger: 'peer-checked:bg-danger-600 dark:peer-checked:bg-danger-500',
  warning: 'peer-checked:bg-warning-500',
  info: 'peer-checked:bg-info-600 dark:peer-checked:bg-info-500',
  neutral: 'peer-checked:bg-neutral-700 dark:peer-checked:bg-neutral-300',
};

const focusRing: Record<PedroColorScheme, string> = {
  primary: 'peer-focus-visible:ring-primary-500',
  secondary: 'peer-focus-visible:ring-secondary-500',
  success: 'peer-focus-visible:ring-success-500',
  danger: 'peer-focus-visible:ring-danger-500',
  warning: 'peer-focus-visible:ring-warning-500',
  info: 'peer-focus-visible:ring-info-500',
  neutral: 'peer-focus-visible:ring-neutral-500',
};

/**
 * An on/off toggle for settings and preferences — semantically still a
 * checkbox (`role` stays native, `type="checkbox"`), styled to look like a
 * switch. Use Checkbox instead when the choice is part of a form
 * submission alongside other unrelated fields; use Switch when it's an
 * immediate-effect setting ("Dark mode", "Email notifications").
 *
 * Same hidden-native-input + `peer-*` styling approach as Checkbox, for
 * the same reason: full visual control without losing native a11y/form
 * behavior.
 *
 * @example
 * <Switch label="Email notifications" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    label,
    labelPosition = 'end',
    size = 'md',
    colorScheme = 'primary',
    className,
    id,
    disabled,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const track = (
    <span className="relative inline-flex shrink-0 items-center">
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        role="switch"
        disabled={disabled}
        className="peer sr-only"
        {...rest}
      />
      <span
        aria-hidden="true"
        className={cn(
          'flex items-center rounded-full bg-neutral-300 p-0.5 dark:bg-neutral-700',
          'transition-colors duration-150',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
          trackSize[size],
          trackChecked[colorScheme],
          focusRing[colorScheme],
        )}
      >
        <span
          className={cn(
            'rounded-full bg-white shadow-sm transition-transform duration-150 ease-out',
            thumbSize[size],
          )}
        />
      </span>
    </span>
  );

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-center gap-2.5',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      )}
    >
      {label && labelPosition === 'start' && (
        <span className="text-small text-text-primary">{label}</span>
      )}
      {track}
      {label && labelPosition === 'end' && (
        <span className="text-small text-text-primary">{label}</span>
      )}
    </label>
  );
});
