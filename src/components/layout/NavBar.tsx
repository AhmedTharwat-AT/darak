import Logo from "../Logo";
import MobileSheet from "./MobileSheet";
import NavLinks from "./NavLinks";
import NavUserIcons from "./NavUserIcons";

function NavBar() {
  return (
    <header className="relative z-10 pt-8 lg:pt-14">
      <div className="container">
        <nav className="flex h-12 justify-between border-b border-stroke pb-2 font-poppins rtl:flex-row-reverse">
          <Logo />

          {/* desktop */}
          <ul className="hidden items-center gap-8 text-lg font-medium lg:flex">
            <NavLinks />
          </ul>

          {/* desktop */}
          <div className="hidden items-center gap-4 lg:flex lg:rtl:flex-row-reverse">
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
