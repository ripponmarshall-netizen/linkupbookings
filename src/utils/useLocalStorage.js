import { useState, useEffect } from 'react';

/**
 * State that persists to localStorage under `key`.
 * Mirrors a plain useState API: returns [value, setValue].
 * `initialValue` may be a value or a lazy initializer function.
 * All storage access is wrapped so a disabled/full localStorage never throws.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) return JSON.parse(raw);
    } catch { /* ignore unreadable/blocked storage */ }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
  }, [key, value]);

  return [value, setValue];
}
