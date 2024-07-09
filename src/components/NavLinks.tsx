"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      <li>
        <Link
          className={` ${
            pathname === "/" ? "text-alt font-semibold" : "text-blacker"
          }`}
          href="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className={` ${
            pathname === "/properties"
              ? "text-alt font-semibold"
              : "text-blacker"
          }`}
          href="/properties"
        >
          Properties
        </Link>
      </li>
      <li>
        <Link
          className={` ${
            pathname === "/contact" ? "text-alt font-semibold" : "text-blacker"
          }`}
          href="/contact"
        >
          Contact Us
        </Link>
      </li>
    </>
  );
}

export default NavLinks;
