/**
 * Delays execution for `ms` milliseconds. Primarily useful in async flows
 * (retry backoff, staged loading skeletons, tests) where you need an
 * awaitable pause without hand-rolling a Promise every time.
 *
 * @example
 * await sleep(300);
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns a debounced wrapper around `fn` that only fires after `wait`
 * milliseconds have passed without another call. Cancels any pending call
 * on each new invocation. Exposes `.cancel()` to clear a pending call
 * imperatively (e.g. on unmount).
 *
 * Prefer the `useDebounce` hook in `@pedro-ui/hooks` inside React components
 * — this function is the primitive it's built on, for non-React contexts.
 *
 * @example
 * const debounced = debounce((q: string) => search(q), 300);
 * input.addEventListener('input', (e) => debounced(e.target.value));
 */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  wait: number,
): ((...args: Args) => void) & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = (...args: Args) => {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), wait);
  };

  debounced.cancel = () => {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
    timeoutId = undefined;
  };

  return debounced;
}

/**
 * Returns a throttled wrapper around `fn` that fires at most once per
 * `wait` milliseconds. Uses a leading-edge call plus a trailing call if
 * invocations arrived during the cooldown, so the final state always
 * eventually fires (important for e.g. scroll-position handlers).
 *
 * @example
 * const onScroll = throttle(updateScrollProgress, 100);
 * window.addEventListener('scroll', onScroll);
 */
export function throttle<Args extends unknown[]>(
  fn: (...args: Args) => void,
  wait: number,
): (...args: Args) => void {
  let lastRan = 0;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Args | undefined;

  return (...args: Args) => {
    const now = Date.now();
    const remaining = wait - (now - lastRan);
    lastArgs = args;

    if (remaining <= 0) {
      lastRan = now;
      fn(...args);
    } else if (timeoutId === undefined) {
      timeoutId = setTimeout(() => {
        lastRan = Date.now();
        timeoutId = undefined;
        if (lastArgs) fn(...lastArgs);
      }, remaining);
    }
  };
}
