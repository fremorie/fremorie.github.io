import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

import { DICTIONARY, type Language, type TranslationKey } from './dictionary';
import {
  getStoredLanguage,
  storeLanguage,
  subscribeToLanguage,
} from './languageStore';

export type I18n = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18n | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribeToLanguage, getStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => storeLanguage(next), []);

  const value = useMemo<I18n>(
    () => ({
      language,
      setLanguage,

      t: (key) => DICTIONARY[language][key] ?? DICTIONARY.en[key],
    }),
    [language, setLanguage],
  );

  return <I18nContext value={value}>{children}</I18nContext>;
}

export function useI18n(): I18n {
  const value = use(I18nContext);
  if (!value) throw new Error('useI18n must be used inside a LanguageProvider');
  return value;
}
