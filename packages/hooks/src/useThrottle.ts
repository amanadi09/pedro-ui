import { useEffect, useRef, useState } from 'react';

/**
 * Returns a throttled snapshot of `value`, updating at most once per
 * `limitMs`. Unlike `useDebounce`, which waits for changes to *stop*,
 * this guarantees a steady cadence of updates while `value` is changing
 * continuously — appropriate for e.g. a live-updating chart driven by a
 * fast-ticking prop, where you still want periodic updates, just not one
 * per tick.
 *
 * @example
 * const throttledScrollY = useThrottle(scrollY, 100);
 */
export function useThrottle<T>(value: T, limitMs = 200): T {
  const [throttled, setThrottled] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const remaining = limitMs - (Date.now() - lastRan.current);

    if (remaining <= 0) {
      lastRan.current = Date.now();
      setThrottled(value);
      return;
    }

    const timeoutId = setTimeout(() => {
      lastRan.current = Date.now();
      setThrottled(value);
    }, remaining);

    return () => clearTimeout(timeoutId);
  }, [value, limitMs]);

  return throttled;
}
