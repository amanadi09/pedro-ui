import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useDarkMode, type ColorMode } from '@pedro-ui/hooks';

export type PedroThemeContextValue = {
  mode: ColorMode;
  resolvedMode: 'light' | 'dark';
  setMode: (mode: ColorMode) => void;
  toggleMode: () => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
};

const PedroThemeContext = createContext<PedroThemeContextValue | null>(null);

export type ThemeProviderProps = {
  children: ReactNode;
  /** Initial color mode preference. Default `'system'`. Persisted after the first change. */
  defaultMode?: ColorMode;
  /** Storage key used to persist the mode preference. Default `'pedro-ui-color-mode'`. */
  storageKey?: string;
};

/**
 * Root provider for Pedro UI. Mount once near the top of your app (see
 * apps/docs/src/main.tsx). Manages color mode (via `useDarkMode` under the
 * hood — see that hook for the `.dark` class / CSS variable mechanics) and
 * an optional high-contrast mode, and exposes both through `useTheme()`.
 *
 * Pedro UI components render correctly without this provider too — it's a
 * convenience layer for app-level theme *controls* (toggles, settings
 * pages), not a requirement for styling to apply, since the actual
 * light/dark values are plain CSS variables scoped to `:root`/`.dark`.
 *
 * @example
 * <ThemeProvider defaultMode="system">
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({
  children,
  defaultMode = 'system',
  storageKey = 'pedro-ui-color-mode',
}: ThemeProviderProps) {
  const { mode, resolvedMode, setMode, toggle } = useDarkMode(storageKey);
  const [highContrast, setHighContrastState] = useState(false);

  // defaultMode only seeds the very first read inside useDarkMode/useLocalStorage;
  // once a user (or this provider) has set an explicit mode it takes over from storage.
  useMemo(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem(storageKey) === null) {
      setMode(defaultMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setHighContrast = (value: boolean) => {
    setHighContrastState(value);
    document.documentElement.classList.toggle('hc', value);
  };

  const value = useMemo<PedroThemeContextValue>(
    () => ({ mode, resolvedMode, setMode, toggleMode: toggle, highContrast, setHighContrast }),
    [mode, resolvedMode, setMode, toggle, highContrast],
  );

  return <PedroThemeContext.Provider value={value}>{children}</PedroThemeContext.Provider>;
}

/**
 * Reads the current theme state and controls. Must be called under a
 * `<ThemeProvider>` — throws a descriptive error otherwise rather than
 * silently returning `undefined`, so the failure surfaces at the call site
 * instead of as a confusing crash three components later.
 *
 * @example
 * const { resolvedMode, toggleMode } = useTheme();
 */
export function useTheme(): PedroThemeContextValue {
  const ctx = useContext(PedroThemeContext);
  if (!ctx) {
    throw new Error(
      'useTheme() was called outside of a <ThemeProvider>. Wrap your app in <ThemeProvider>.',
    );
  }
  return ctx;
}
