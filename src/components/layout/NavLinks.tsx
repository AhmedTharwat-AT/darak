"use client";

import AnimatedLink from "../AnimatedLink";
import useLocale from "@/hooks/useLocale";

function NavLinks() {
  const { locale, pathname } = useLocale();

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
          Home
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
          Properties
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
          Contact Us
        </AnimatedLink>
      </li>
    </>
  );
}

export default NavLinks;
