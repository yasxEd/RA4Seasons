'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import en from '../locales/en';
import fr from '../locales/fr';
import ar from '../locales/ar';

type Translations = Record<string, string>;

type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Optionally persist language in localStorage
    const storedLang = typeof window !== 'undefined' ? localStorage.getItem('ovalo-lang') : null;
    if (storedLang && (storedLang === 'en' || storedLang === 'fr' || storedLang === 'ar')) {
      setLanguage(storedLang as Language);
    } else if (typeof window !== 'undefined') {
      // Fallback to browser language if not set
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === 'fr' || browserLang === 'ar') {
        setLanguage(browserLang as Language);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ovalo-lang', language);
      document.documentElement.lang = language;
      document.body.setAttribute('data-lang', language);
      document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language]);

  const translations: Record<Language, Translations> = { en, fr, ar };

  const t = (key: string, params?: Record<string, string | number>) => {
    let str = (translations[language] as Translations)[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        str = str.replace(new RegExp(`{${k}}`, 'g'), String(v));
      });
    }
    return str;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
