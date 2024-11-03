"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

function ProfileLink({ href, text }: { href: string; text: string }) {
  const pathname = usePathname();

  return (
    <li
      className={cn(
        "rounded-md border bg-bgDark text-center shadow-md transition-all hover:bg-bgDarker",
        pathname == href && "bg-main text-white hover:bg-main",
      )}
    >
      <Link className="block size-full py-2" href={`${href}`}>
        {text}
      </Link>
    </li>
  );
}

export default ProfileLink;
