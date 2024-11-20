"use client";

import globeIcon from "@/assets/icons/globe.svg";
import useLocale from "@/hooks/useLocale";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

function ChangeLocale({ scale }: { scale?: number }) {
  const router = useRouter();
  const { pathname, hasLocale } = useLocale();
  const isArabic = pathname.startsWith("/ar");
  const newHref = hasLocale
    ? isArabic
      ? pathname.replace("/ar", "/en")
      : pathname.replace("/en", "/ar")
    : "/en" + pathname;

  return (
    <button
      onClick={() => {
        router.push(newHref);
      }}
      aria-label={`change locale to ${isArabic ? "English" : "Arabic"}`}
    >
      <Image
        src={globeIcon}
        className="rounded-full bg-bgDark p-2"
        alt="user"
        width={scale}
        height={scale}
      />
    </button>
  );
}

export default ChangeLocale;
