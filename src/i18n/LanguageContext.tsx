import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import en from './en';
import it from './it';

const dictionaries = { en, it } as const;
export type Lang = keyof typeof dictionaries;

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof en;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectInitialLang(): Lang {
  const stored = localStorage.getItem('lang');
  if (stored === 'en' || stored === 'it') return stored;
  return navigator.language.startsWith('it') ? 'it' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  function setLang(next: Lang) {
    setLangState(next);
    localStorage.setItem('lang', next);
  }

  // Ensure we always return the complete translation object
  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: dictionaries[lang] as typeof en,
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
