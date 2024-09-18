import Image from "next/image";
import Link from "next/link";

function NavUserIcons({ scale = 35 }: { scale?: number }) {
  return (
    <>
      <Link href={"/"}>
        <Image
          src={"/assets/icons/profile.svg"}
          alt="user"
          className="bg-bgDark p-2 rounded-full"
          width={scale}
          height={scale}
        />
      </Link>
      <Link href={"/"}>
        <Image
          src={"/assets/icons/globe.svg"}
          className="bg-bgDark p-2 rounded-full"
          alt="user"
          width={scale}
          height={scale}
        />
      </Link>
      <Link href={"/"}>
        <Image
          src={"/assets/icons/bookmark-1.svg"}
          className="bg-bgDark p-2 rounded-full"
          alt="user"
          width={scale}
          height={scale}
        />
      </Link>
    </>
  );
}

export default NavUserIcons;
