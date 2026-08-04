import { isLanguage, type Language } from './dictionary';

const STORAGE_KEY = 'lang';

const listeners = new Set<() => void>();

export function subscribeToLanguage(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener('storage', onChange);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onChange);
  };
}

export function getStoredLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY);
  return isLanguage(stored) ? stored : 'en';
}

export function storeLanguage(next: Language) {
  localStorage.setItem(STORAGE_KEY, next);

  for (const listener of listeners) listener();
}
