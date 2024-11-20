"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import useLocale from "@/hooks/useLocale";

function ProfileLink({ href, text }: { href: string; text: string }) {
  const { pathname, locale } = useLocale();
  const newHref = "/" + locale + href;

  return (
    <li
      className={cn(
        "rounded-md border bg-bgDark text-center shadow-md transition-all hover:bg-bgDarker",
        pathname == newHref && "bg-main text-white hover:bg-main",
      )}
    >
      <Link className="block size-full py-2" href={`${newHref}`}>
        {text}
      </Link>
    </li>
  );
}

export default ProfileLink;
