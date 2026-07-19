import { useCallback, useEffect, useState } from 'react';

/**
 * Internal factory shared by `useLocalStorage` and `useSessionStorage` — the
 * two hooks are identical except for *which* Storage object they read from,
 * so the read/write/sync logic lives here once rather than being copied
 * twice. Not exported from the package; consumers use the two named hooks.
 */
export function createStorageHook(storageArea: () => Storage) {
  return function useStorage<T>(
    key: string,
    initialValue: T,
  ): [T, (value: T | ((prev: T) => T)) => void, () => void] {
    const readValue = useCallback((): T => {
      if (typeof window === 'undefined') return initialValue;
      try {
        const item = storageArea().getItem(key);
        return item !== null ? (JSON.parse(item) as T) : initialValue;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.warn(`useStorage: failed to read key "${key}", falling back to initial value.`);
        return initialValue;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const [storedValue, setStoredValue] = useState<T>(readValue);

    const setValue = useCallback(
      (value: T | ((prev: T) => T)) => {
        try {
          const valueToStore = value instanceof Function ? value(storedValue) : value;
          setStoredValue(valueToStore);
          if (typeof window !== 'undefined') {
            storageArea().setItem(key, JSON.stringify(valueToStore));
            window.dispatchEvent(new StorageEvent('storage', { key, storageArea: storageArea() }));
          }
        } catch (error) {
          console.warn(`useStorage: failed to write key "${key}".`, error);
        }
      },
      [key, storedValue],
    );

    const removeValue = useCallback(() => {
      try {
        storageArea().removeItem(key);
        setStoredValue(initialValue);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.warn(`useStorage: failed to remove key "${key}".`);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    // Cross-tab sync: another tab/window changing the same key updates us too.
    useEffect(() => {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === key && event.storageArea === storageArea()) {
          setStoredValue(readValue());
        }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }, [key, readValue]);

    return [storedValue, setValue, removeValue];
  };
}
