import { useEffect, useRef } from 'react';

/**
 * Returns the value a hook/component held on the *previous* render — handy
 * for diffing (`if (prev !== value) ...`) or showing "was X, now Y" copy.
 * Returns `undefined` on the first render, since there is no previous value.
 *
 * @example
 * const previousCount = usePrevious(count);
 * const direction = previousCount === undefined ? null : count > previousCount ? 'up' : 'down';
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
