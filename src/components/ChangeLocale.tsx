"use client";

import globeIcon from "@/assets/icons/globe.svg";
import useLocale from "@/hooks/useLocale";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function ChangeLocale({ scale }: { scale?: number }) {
  const router = useRouter();
  const { locale, pathWithlocale } = useLocale();
  const searchParams = useSearchParams().toString();

  const isArabic = locale === "ar";
  const newPathname = isArabic
    ? pathWithlocale.replace("/ar", "/en")
    : pathWithlocale.replace("/en", "/ar");

  const newHref = newPathname + (searchParams ? `?${searchParams}` : "");

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
