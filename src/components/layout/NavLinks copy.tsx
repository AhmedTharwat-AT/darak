"use client";

import { usePathname } from "next/navigation";
import AnimatedLink from "../AnimatedLink";

function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      <li>
        <AnimatedLink
          className={` ${
            pathname === "/" ? "text-alt  font-semibold" : "text-blacker"
          }`}
          href="/"
        >
          Home
        </AnimatedLink>
      </li>
      <li>
        <AnimatedLink
          className={` ${
            pathname === "/properties"
              ? "text-alt font-semibold"
              : "text-blacker"
          }`}
          href="/properties"
        >
          Properties
        </AnimatedLink>
      </li>
      <li>
        <AnimatedLink
          className={` ${
            pathname === "/contact" ? "text-alt font-semibold" : "text-blacker"
          }`}
          href="/contact"
        >
          Contact Us
        </AnimatedLink>
      </li>
    </>
  );
}

export default NavLinks;
