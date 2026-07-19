import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export type UseIntersectionObserverOptions = IntersectionObserverInit & {
  /** Stop observing after the first time the element becomes visible. Default `false`. */
  freezeOnceVisible?: boolean;
};

/**
 * Observes when an element enters the viewport (or a scroll container).
 * Powers `useInfiniteScroll`, scroll-triggered reveal animations, and
 * lazy-mounted content.
 *
 * @returns `[ref, isIntersecting, entry]` — attach `ref` to the element you
 *   want to watch.
 *
 * @example
 * const [ref, isVisible] = useIntersectionObserver({ threshold: 0.25 });
 * return <div ref={ref}>{isVisible && <Chart />}</div>;
 */
export function useIntersectionObserver<T extends HTMLElement>(
  options: UseIntersectionObserverOptions = {},
): [RefObject<T | null>, boolean, IntersectionObserverEntry | undefined] {
  const { threshold, root, rootMargin, freezeOnceVisible = false } = options;
  const ref = useRef<T>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const node = ref.current;
    if (!node || frozen) return;

    const observer = new IntersectionObserver(([observedEntry]) => setEntry(observedEntry), {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, root, rootMargin, frozen]);

  return [ref, !!entry?.isIntersecting, entry];
}
