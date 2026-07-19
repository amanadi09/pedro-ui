import { useEffect, useState } from 'react';

/**
 * Subscribes to a CSS media query and returns whether it currently matches,
 * updating live as the viewport or system preference changes. Backs
 * `useDarkMode` (`prefers-color-scheme`) and is directly useful for
 * responsive logic that needs to branch in JS, not just CSS.
 *
 * Returns `false` during server-side rendering / before mount, since
 * `window.matchMedia` isn't available there — components should treat the
 * first client render as provisional if SSR is in play.
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 640px)');
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(mql.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
