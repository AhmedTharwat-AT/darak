import "server-only";

const dictionaries: Record<
  string,
  () => Promise<{ [key: string]: string | object }>
> = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]();
