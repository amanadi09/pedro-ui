import { useEffect, useState } from 'react';
import { throttle } from '@nova-ui/utils';

export type WindowSize = { width: number; height: number };

/**
 * Tracks `window.innerWidth`/`innerHeight`, throttled to one update per
 * 150ms so a resize drag doesn't flood re-renders. Returns `{ width: 0,
 * height: 0 }` before mount (SSR-safe default).
 *
 * @example
 * const { width } = useWindowSize();
 * const columns = width < 640 ? 1 : width < 1024 ? 2 : 3;
 */
export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(() =>
    typeof window !== 'undefined'
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 0, height: 0 },
  );

  useEffect(() => {
    const handleResize = throttle(() => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }, 150);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
