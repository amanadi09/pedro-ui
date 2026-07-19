import { useEffect, useRef } from 'react';

export type UseKeyboardShortcutOptions = {
  /** Set `false` to temporarily disable without unmounting. Default `true`. */
  enabled?: boolean;
  /** Call `event.preventDefault()` when the shortcut matches. Default `true`. */
  preventDefault?: boolean;
  /** Attach to a different target than `window` (e.g. a specific container). */
  target?: EventTarget | null;
};

/**
 * Fires `handler` when the given key combo is pressed. Combos are
 * `'+'`-joined, case-insensitive, and support `mod` as a cross-platform
 * alias for Cmd on macOS / Ctrl elsewhere — e.g. `'mod+k'` for a command
 * palette works correctly on both without branching on `navigator.platform`
 * in every callsite.
 *
 * @param combo - e.g. `'mod+k'`, `'shift+/'`, `'escape'`.
 *
 * @example
 * useKeyboardShortcut('mod+k', () => setCommandPaletteOpen(true));
 * useKeyboardShortcut('escape', onClose, { enabled: isOpen });
 */
export function useKeyboardShortcut(
  combo: string,
  handler: (event: KeyboardEvent) => void,
  options: UseKeyboardShortcutOptions = {},
): void {
  const { enabled = true, preventDefault = true, target } = options;
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled) return;
    const eventTarget = target ?? window;

    const parts = combo
      .toLowerCase()
      .split('+')
      .map((part) => part.trim());
    const wantsMod = parts.includes('mod');
    const wantsShift = parts.includes('shift');
    const wantsAlt = parts.includes('alt');
    const key = parts.find((part) => !['mod', 'shift', 'alt', 'ctrl', 'meta'].includes(part));

    const listener = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      const eventKey = keyboardEvent.key.toLowerCase();
      const modPressed = keyboardEvent.metaKey || keyboardEvent.ctrlKey;

      const matches =
        eventKey === key &&
        (!wantsMod || modPressed) &&
        keyboardEvent.shiftKey === wantsShift &&
        keyboardEvent.altKey === wantsAlt;

      if (matches) {
        if (preventDefault) keyboardEvent.preventDefault();
        handlerRef.current(keyboardEvent);
      }
    };

    eventTarget.addEventListener('keydown', listener);
    return () => eventTarget.removeEventListener('keydown', listener);
  }, [combo, enabled, preventDefault, target]);
}
