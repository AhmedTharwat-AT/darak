"use client";

import { useTranslation } from "@/context/TranslationProvider";
import AnimatedLink from "../AnimatedLink";
import useLocale from "@/hooks/useLocale";

function NavLinks() {
  const { locale, pathname } = useLocale();
  const { dictionary } = useTranslation();

  return (
    <>
      <li>
        <AnimatedLink
          className={` ${
            pathname === `/${locale}`
              ? "font-semibold text-alt"
              : "text-blacker"
          }`}
          href={`/`}
        >
          {dictionary.navlinks.home}
        </AnimatedLink>
      </li>
      <li>
        <AnimatedLink
          className={` ${
            pathname === `/${locale}/properties`
              ? "font-semibold text-alt"
              : "text-blacker"
          }`}
          href={`/properties`}
        >
          {dictionary.navlinks.properties}
        </AnimatedLink>
      </li>
      <li>
        <AnimatedLink
          className={` ${
            pathname === `/${locale}/contact`
              ? "font-semibold text-alt"
              : "text-blacker"
          }`}
          href={`/contact`}
        >
          {dictionary.navlinks.contact}
        </AnimatedLink>
      </li>
    </>
  );
}

export default NavLinks;
