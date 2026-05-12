"use client";

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { dictionaries, type Locale, type Dictionary } from "./dictionaries";

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  t: Dictionary;
}

const LocaleContext = createContext<LocaleCtx>({
  locale: "en",
  setLocale: () => {},
  toggleLocale: () => {},
  t: dictionaries.en,
});

// Maps the in-app locale to a BCP-47 lang code for the <html lang> attr.
// Used by screen readers (a11y) and search engines (hreflang signal).
const HTML_LANG_BY_LOCALE: Record<Locale, string> = {
  en: "en",
  zh: "zh-Hant",
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "en" || saved === "zh") setLocaleState(saved);
  }, []);

  // Keep <html lang> in sync with the active locale so screen readers
  // announce content with the right phoneme set and Google sees a correct
  // language signal per page view.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = HTML_LANG_BY_LOCALE[locale];
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "zh" : "en");
  }, [locale, setLocale]);

  const t = useMemo(() => dictionaries[locale], [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
