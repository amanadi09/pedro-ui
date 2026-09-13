import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useMediaQuery } from './useMediaQuery';

export type ColorMode = 'light' | 'dark' | 'system';

export type UseDarkModeResult = {
  /** The user's stored preference — may be `'system'`. */
  mode: ColorMode;
  /** The mode actually in effect right now — always `'light'` or `'dark'`, `'system'` already resolved. */
  resolvedMode: 'light' | 'dark';
  setMode: (mode: ColorMode) => void;
  /** Toggles between light and dark, leaving `'system'` if that's not the current resolved mode's origin — i.e. this always lands on an explicit choice. */
  toggle: () => void;
};

/**
 * Manages light/dark/system color mode: persists the preference to
 * `localStorage`, resolves `'system'` against `prefers-color-scheme` live,
 * and applies/removes the `.dark` class on `<html>` as a side effect so
 * Tailwind's `dark:` variant and Pedro UI's CSS-variable tokens pick it up
 * everywhere, not just inside React-rendered trees.
 *
 * `ThemeProvider` calls this internally — use this hook directly only if
 * you need dark-mode state *outside* the component tree `ThemeProvider`
 * wraps, or are building a custom theme toggle from scratch.
 *
 * @example
 * const { resolvedMode, toggle } = useDarkMode();
 * <IconButton aria-label="Toggle theme" onClick={toggle}>
 *   {resolvedMode === 'dark' ? <Sun /> : <Moon />}
 * </IconButton>
 */
export function useDarkMode(storageKey = 'pedro-ui-color-mode'): UseDarkModeResult {
  const [mode, setMode] = useLocalStorage<ColorMode>(storageKey, 'system');
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  const resolvedMode: 'light' | 'dark' =
    mode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : mode;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedMode === 'dark');
  }, [resolvedMode]);

  const toggle = useCallback(() => {
    setMode(resolvedMode === 'dark' ? 'light' : 'dark');
  }, [resolvedMode, setMode]);

  return { mode, resolvedMode, setMode, toggle };
}
