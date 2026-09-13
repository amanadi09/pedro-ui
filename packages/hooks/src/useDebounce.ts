import { useEffect, useState } from 'react';

/**
 * Returns a debounced *snapshot* of `value`: it only updates once `value`
 * has stopped changing for `delayMs`. This is the declarative counterpart
 * to `debounce()` in `@pedro-ui/utils`, which debounces a *callback* for
 * imperative code — reach for that one outside of React, this one for
 * state that flows into JSX (typeahead inputs, live filters).
 *
 * @example
 * const [query, setQuery] = useState('');
 * const debouncedQuery = useDebounce(query, 300);
 * useEffect(() => { if (debouncedQuery) search(debouncedQuery); }, [debouncedQuery]);
 */
export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timeoutId);
  }, [value, delayMs]);

  return debounced;
}
