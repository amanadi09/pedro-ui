import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Calls `handler` when a pointer or touch event lands outside the DOM
 * element referenced by `ref`. The backbone of dismiss-on-outside-click
 * for Popover, Dropdown, Select, Modal, and Command Palette.
 *
 * Listens on `mousedown`/`touchstart` (not `click`) so it fires before a
 * click-triggered re-render can remount the ref'd element out from under
 * the listener, and so it works on touch devices, which don't fire `click`
 * for outside taps the same way.
 *
 * @param ref - Ref to the element that should be considered "inside".
 * @param handler - Called with the originating event when a click lands outside.
 * @param active - Set `false` to disable the listener without unmounting (e.g. a closed popover).
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useOutsideClick(ref, () => setOpen(false), open);
 */
export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  active = true,
): void {
  useEffect(() => {
    if (!active) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, active]);
}
