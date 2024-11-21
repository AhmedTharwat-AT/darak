"use client";

import { createContext, use } from "react";

const TranslationContext = createContext({ dictionary: {} });

function TranslationProvider({
  children,
  dictionary,
}: {
  children: React.ReactNode;
  dictionary: object;
}) {
  return (
    <TranslationContext.Provider value={{ dictionary }}>
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
