import "server-only";
import en from "@/dictionaries/en.json";
export type dictionaryType = typeof en;

const dictionaries: Record<string, () => Promise<dictionaryType>> = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]();
