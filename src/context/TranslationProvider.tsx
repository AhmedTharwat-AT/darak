"use client";

import { DictionaryType } from "@/app/[locale]/dictionaries";
import { createContext, use } from "react";

const TranslationContext = createContext<{
  dictionary: DictionaryType;
  locale: string;
} | null>(null);

function TranslationProvider({
  children,
  dictionary,
  locale,
}: {
  children: React.ReactNode;
  dictionary: DictionaryType;
  locale: string;
}) {
  return (
    <TranslationContext.Provider value={{ dictionary, locale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslation = () => {
  const context = use(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }

  return context;
};

export default TranslationProvider;
