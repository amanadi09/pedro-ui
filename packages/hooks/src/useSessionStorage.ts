import { createStorageHook } from './internal-useStorage';

/**
 * Same contract as `useLocalStorage`, backed by `sessionStorage` instead —
 * state persists across reloads but clears when the tab closes. Useful for
 * multi-step wizards or filters you want to survive a refresh but not a
 * new session.
 *
 * @example
 * const [draft, setDraft] = useSessionStorage('checkout-draft', initialDraft);
 */
export const useSessionStorage = createStorageHook(() => window.sessionStorage);
