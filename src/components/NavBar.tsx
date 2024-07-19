import Image from "next/image";
import NavLinks from "./NavLinks";
import NavUserIcons from "./NavUserIcons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function NavBar() {
  return (
    <header className="pt-[3.5rem]">
      <div className="container">
        <div className="flex w-full justify-between items-center border-b pb-2 border-stroke h-12 font-poppins">
          <Image src={"/assets/logo.svg"} alt="logo" width={135} height={50} />

          <nav className="md:block hidden">
            <ul className="flex  gap-8 items-center text-lg font-medium">
              <NavLinks />
            </ul>
          </nav>

          <div className="md:flex hidden items-center gap-4">
            <NavUserIcons />
          </div>

          {/* mobile side menu */}

          <Sheet>
            <SheetTrigger className=" md:hidden">Open</SheetTrigger>
            <SheetContent className="py-8">
              <div className="flex items-center justify-center gap-5">
                <NavUserIcons scale={40} />
              </div>

              <hr className="my-8 bg-stroke" />

              <nav className="">
                <ul className="flex flex-col gap-8 items-start text-lg font-medium font-poppins">
                  <NavLinks />
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
