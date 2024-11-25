import "server-only";
import en from "@/dictionaries/en.json";
import { cache } from "@/lib/utils";
export type DictionaryType = typeof en;

const dictionaries: Record<string, () => Promise<DictionaryType>> = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
};

// export const getDictionary = async (locale: string) => dictionaries[locale]();

export const getDictionary: (
  locale: string,
) => Promise<DictionaryType> = async (locale = "en") =>
  cache(async (locale: string) => dictionaries[locale](), ["locale", locale], {
    revalidate: 1,
  })(locale);
