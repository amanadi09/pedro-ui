import { createStorageHook } from './internal-useStorage';

/**
 * Persists React state to `localStorage`, JSON-serialized, and keeps it in
 * sync across tabs/windows via the native `storage` event. Falls back
 * gracefully (logs a warning, keeps working in-memory) if storage is
 * unavailable — private browsing, quota exceeded, SSR.
 *
 * @returns `[value, setValue, removeValue]` — same shape as `useState`,
 *   plus a `removeValue` to clear the key and reset to `initialValue`.
 *
 * @example
 * const [theme, setTheme, resetTheme] = useLocalStorage('pedro-theme', 'system');
 */
export const useLocalStorage = createStorageHook(() => window.localStorage);
