import { usePathname } from "next/navigation";

const locales = ["en", "ar"];

function useLocale() {
  const pathname = usePathname();
  const firstParam = pathname.split("/")[1];
  const hasLocale = locales.includes(firstParam);
  const locale = hasLocale ? firstParam : "en";
  const pathWithlocale = hasLocale ? pathname : `/${locale}${pathname}`;

  return { pathname, locale, hasLocale, pathWithlocale };
}

export default useLocale;
