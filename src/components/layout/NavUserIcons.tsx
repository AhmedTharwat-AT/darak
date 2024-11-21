import Image from "next/image";
import AnimatedLink from "../AnimatedLink";
import profileIcon from "@/assets/icons/profile.svg";
import globeIcon from "@/assets/icons/globe.svg";
import bookmarkIcon from "@/assets/icons/bookmark-1.svg";
import ChangeLocale from "../ChangeLocale";
import { Suspense } from "react";

function NavUserIcons({ scale = 35 }: { scale?: number }) {
  return (
    <>
      <AnimatedLink href={"/profile"}>
        <Image
          src={profileIcon}
          alt="user"
          className="rounded-full bg-bgDark p-2"
          width={scale}
          height={scale}
        />
      </AnimatedLink>

      <Suspense fallback={null}>
        <ChangeLocale scale={scale} />
      </Suspense>

      <AnimatedLink href={"/bookmark"}>
        <Image
          src={bookmarkIcon}
          className="rounded-full bg-bgDark p-2"
          alt="user"
          width={scale}
          height={scale}
        />
      </AnimatedLink>
    </>
  );
}

export default NavUserIcons;
