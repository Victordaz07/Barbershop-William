import { createContext, useContext, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_STORAGE_KEY } from '../i18n';

export type Language = 'en' | 'to';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<Language>(i18n.language as Language);

  const setLanguage = (next: Language) => {
    i18n.changeLanguage(next);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    setLanguageState(next);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'to' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with its provider
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
