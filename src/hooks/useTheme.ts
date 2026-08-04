import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', onChange);

  window.addEventListener('storage', onChange);

  return () => {
    listeners.delete(onChange);
    media.removeEventListener('change', onChange);
    window.removeEventListener('storage', onChange);
  };
}

function getTheme(): Theme {
  const chosen = document.documentElement.getAttribute('data-theme');
  if (chosen === 'dark' || chosen === 'light') return chosen;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme);

  const toggle = useCallback(() => {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
    for (const listener of listeners) listener();
  }, []);

  return { theme, toggle };
}
