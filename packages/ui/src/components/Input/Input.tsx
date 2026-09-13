import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@pedro-ui/utils';
import type { PedroSize } from '../../types';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  /** Shown below the input when there's no error. Cleared visually (not removed from the DOM read order) once `errorText` is set. */
  helperText?: string;
  /** Presence of `errorText` implies `isInvalid` — you rarely need to pass both. */
  errorText?: string;
  isInvalid?: boolean;
  size?: PedroSize;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  containerClassName?: string;
}

const sizeStyles: Record<PedroSize, string> = {
  sm: 'h-8 text-small rounded-md',
  md: 'h-10 text-small rounded-lg',
  lg: 'h-12 text-body rounded-lg',
};

const paddingWithoutAdornment: Record<PedroSize, string> = { sm: 'px-2.5', md: 'px-3', lg: 'px-4' };

/**
 * A labeled text input with built-in helper/error messaging and optional
 * leading/trailing adornments (icons, currency symbols, unit suffixes).
 *
 * a11y wiring is automatic: `label` uses a real `<label htmlFor>` (not
 * just visual placement), and the input's `aria-describedby` points at
 * whichever of helper/error text is currently shown, and `aria-invalid`
 * follows `isInvalid`/`errorText` — all derived from `useId()` rather than
 * requiring the caller to manage ids by hand.
 *
 * Renders a plain, uncontrolled-or-controlled native `<input>` under the
 * hood (not a custom widget), so it drops directly into React Hook Form's
 * `register()` or a Controller without adapter code.
 *
 * @example
 * <Input label="Email" type="email" placeholder="you@company.com" leftElement={<Mail className="size-4" />} />
 * <Input label="API key" errorText="This key has been revoked." isInvalid />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    helperText,
    errorText,
    isInvalid,
    size = 'md',
    leftElement,
    rightElement,
    className,
    containerClassName,
    id,
    disabled,
    required,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const invalid = isInvalid || !!errorText;
  const describedBy = errorText ? errorId : helperText ? helperId : undefined;

  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-label text-text-primary">
          {label}
          {required && (
            <span className="ml-0.5 text-danger-600 dark:text-danger-400" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        {leftElement && (
          <span className="pointer-events-none absolute left-3 flex items-center text-text-secondary [&_svg]:size-4">
            {leftElement}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(
            'w-full border bg-surface text-text-primary placeholder:text-text-disabled',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50',
            sizeStyles[size],
            leftElement ? 'pl-9' : paddingWithoutAdornment[size],
            rightElement ? 'pr-9' : paddingWithoutAdornment[size],
            invalid
              ? 'border-danger-400 focus-visible:ring-danger-500 dark:border-danger-600'
              : 'border-border-strong focus-visible:ring-focus-ring',
            className,
          )}
          {...rest}
        />

        {rightElement && (
          <span className="absolute right-3 flex items-center text-text-secondary [&_svg]:size-4">
            {rightElement}
          </span>
        )}
      </div>

      {errorText ? (
        <p id={errorId} className="mt-1.5 text-caption text-danger-600 dark:text-danger-400">
          {errorText}
        </p>
      ) : helperText ? (
        <p id={helperId} className="mt-1.5 text-caption text-text-secondary">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
