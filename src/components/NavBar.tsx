import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";

function NavBar() {
  return (
    <header className="pt-[3.5rem]">
      <div className="container">
        <div className="flex w-full justify-between items-center border-b pb-2 border-stroke h-12 font-poppins">
          <Image src={"/assets/logo.svg"} alt="logo" width={135} height={50} />

          <nav>
            <ul className="flex gap-8 items-center text-lg font-medium">
              <NavLinks />
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Link href={"/login"}>
              <Image
                src={"/assets/icons/profile.svg"}
                alt="user"
                width={20}
                height={20}
              />
            </Link>
            <Link href={"/login"}>
              <Image
                src={"/assets/icons/globe.svg"}
                alt="user"
                width={20}
                height={20}
              />
            </Link>
            <Link href={"/login"}>
              <Image
                src={"/assets/icons/bookmark-1.svg"}
                alt="user"
                width={20}
                height={20}
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
