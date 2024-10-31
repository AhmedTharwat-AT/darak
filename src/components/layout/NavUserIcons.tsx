import Image from "next/image";
import AnimatedLink from "../AnimatedLink";

function NavUserIcons({ scale = 35 }: { scale?: number }) {
  return (
    <>
      <AnimatedLink href={"/profile"}>
        <Image
          src={"/assets/icons/profile.svg"}
          alt="user"
          className="rounded-full bg-bgDark p-2"
          width={scale}
          height={scale}
        />
      </AnimatedLink>
      <AnimatedLink href={"/"}>
        <Image
          src={"/assets/icons/globe.svg"}
          className="rounded-full bg-bgDark p-2"
          alt="user"
          width={scale}
          height={scale}
        />
      </AnimatedLink>
      <AnimatedLink href={"/bookmark"}>
        <Image
          src={"/assets/icons/bookmark-1.svg"}
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
