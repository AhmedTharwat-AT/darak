import NavLinks from "./NavLinks";
import NavUserIcons from "./NavUserIcons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CgMenuRight } from "react-icons/cg";
import Logo from "../Logo";
import MobileSheet from "./MobileSheet";

function NavBar() {
  return (
    <header className="relative z-10 pt-8 md:pt-14">
      <div className="container">
        <nav className="flex h-12 justify-between border-b border-stroke pb-2 font-poppins">
          <Logo />

          {/* desktop */}
          <ul className="hidden items-center gap-8 text-lg font-medium md:flex">
            <NavLinks />
          </ul>

          {/* desktop */}
          <div className="hidden items-center gap-4 md:flex">
            <NavUserIcons />
          </div>

          {/* mobile side menu */}
          <MobileSheet />
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
