"use client";
import { useState } from "react";

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

function MobileSheet() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden">
        <CgMenuRight className="size-8 text-font rtl:rotate-180" />
      </SheetTrigger>

      <SheetContent className="py-8">
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>

        <nav className="flex h-full flex-col" onClick={() => setOpen(false)}>
          <div className="flex items-center justify-center gap-5">
            <NavUserIcons scale={40} />
          </div>

          <hr className="my-8 bg-stroke" />

          <ul className="mb-8 flex flex-col items-start gap-8 font-poppins text-lg font-medium rtl:ps-6 rtl:text-xl">
            <NavLinks />
          </ul>

          <p className="mt-auto flex justify-center gap-1 text-center text-sm text-gray-500 rtl:flex-row-reverse">
            <span>©2024</span>
            Darak Real States , Ahmed Tharwat
          </p>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileSheet;
