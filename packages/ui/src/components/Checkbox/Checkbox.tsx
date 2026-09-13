import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '@pedro-ui/utils';
import type { PedroColorScheme, PedroSize } from '../../types';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  label?: string;
  size?: PedroSize;
  colorScheme?: PedroColorScheme;
  /** Renders a dash instead of a check — for a parent checkbox whose children are partially selected. Purely visual; doesn't affect `checked`/form value. */
  isIndeterminate?: boolean;
}

const boxSize: Record<PedroSize, string> = { sm: 'size-4', md: 'size-5', lg: 'size-6' };
const iconSize: Record<PedroSize, string> = { sm: 'size-3', md: 'size-3.5', lg: 'size-4' };
const labelTextSize: Record<PedroSize, string> = {
  sm: 'text-small',
  md: 'text-small',
  lg: 'text-body',
};

const checkedBg: Record<PedroColorScheme, string> = {
  primary:
    'peer-checked:border-primary-600 peer-checked:bg-primary-600 dark:peer-checked:border-primary-500 dark:peer-checked:bg-primary-500',
  secondary:
    'peer-checked:border-secondary-600 peer-checked:bg-secondary-600 dark:peer-checked:border-secondary-500 dark:peer-checked:bg-secondary-500',
  success:
    'peer-checked:border-success-600 peer-checked:bg-success-600 dark:peer-checked:border-success-500 dark:peer-checked:bg-success-500',
  danger:
    'peer-checked:border-danger-600 peer-checked:bg-danger-600 dark:peer-checked:border-danger-500 dark:peer-checked:bg-danger-500',
  warning: 'peer-checked:border-warning-500 peer-checked:bg-warning-500',
  info: 'peer-checked:border-info-600 peer-checked:bg-info-600 dark:peer-checked:border-info-500 dark:peer-checked:bg-info-500',
  neutral:
    'peer-checked:border-neutral-700 peer-checked:bg-neutral-700 dark:peer-checked:border-neutral-300 dark:peer-checked:bg-neutral-300',
};

// Same palette as checkedBg, unconditional (no peer-checked: prefix) — used
// for the isIndeterminate visual override, see the render below.
const checkedBgSolid: Record<PedroColorScheme, string> = {
  primary: 'border-primary-600 bg-primary-600 dark:border-primary-500 dark:bg-primary-500',
  secondary:
    'border-secondary-600 bg-secondary-600 dark:border-secondary-500 dark:bg-secondary-500',
  success: 'border-success-600 bg-success-600 dark:border-success-500 dark:bg-success-500',
  danger: 'border-danger-600 bg-danger-600 dark:border-danger-500 dark:bg-danger-500',
  warning: 'border-warning-500 bg-warning-500',
  info: 'border-info-600 bg-info-600 dark:border-info-500 dark:bg-info-500',
  neutral: 'border-neutral-700 bg-neutral-700 dark:border-neutral-300 dark:bg-neutral-300',
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
 * A checkbox with full custom styling that never sacrifices native
 * semantics: the real `<input type="checkbox">` stays in the DOM (visually
 * hidden via `sr-only`, not `display: none`), so screen readers, keyboard
 * nav, and `<form>`/React Hook Form `register()` all work exactly like a
 * plain checkbox. The visible box is a sibling `<span>` driven entirely by
 * the `peer-*` Tailwind variants off the real input's state — no
 * JS-managed "checked" style branch to get out of sync.
 *
 * `isIndeterminate` is visual-only (renders a dash) since `indeterminate`
 * isn't a real HTML attribute — set the DOM property yourself via ref if
 * you need the underlying input to also report indeterminate to the
 * accessibility tree.
 *
 * @example
 * <Checkbox label="Select all" checked={allSelected} onChange={(e) => setAll(e.target.checked)} />
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label,
    size = 'md',
    colorScheme = 'primary',
    isIndeterminate = false,
    className,
    id,
    disabled,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-center gap-2',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      )}
    >
      <span className="relative inline-flex items-center">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          className="peer sr-only"
          {...rest}
        />
        <span
          aria-hidden="true"
          className={cn(
            'flex items-center justify-center rounded border-2 border-border-strong bg-surface text-white',
            'transition-colors duration-150',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
            boxSize[size],
            checkedBg[colorScheme],
            focusRing[colorScheme],
            // isIndeterminate is a plain React prop (not real DOM :indeterminate
            // state, which needs an imperative ref since HTML has no static
            // attribute for it) — so it's styled directly rather than via peer-*.
            isIndeterminate && checkedBgSolid[colorScheme],
          )}
        >
          {isIndeterminate ? (
            <Minus className={iconSize[size]} strokeWidth={3} />
          ) : (
            <Check
              className={cn(iconSize[size], 'opacity-0 peer-checked:opacity-100')}
              strokeWidth={3}
            />
          )}
        </span>
      </span>
      {label && <span className={cn('text-text-primary', labelTextSize[size])}>{label}</span>}
    </label>
  );
});
