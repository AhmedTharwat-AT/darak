import SignoutBtn from "@/components/SignoutBtn";
import ProfileLisnk from "@/features/profile/components/ProfileLink";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="container grid h-full grid-cols-1 gap-8 py-8 font-poppins max-sm:grid-rows-[auto_1fr] sm:grid-cols-[auto_1fr] sm:gap-4">
      <aside className="border-gray-400 sm:border-e">
        <ul className="sticky top-2 flex h-fit flex-col gap-2 pe-2 capitalize sm:w-40">
          <ProfileLisnk text="profile" href="/profile" />
          <ProfileLisnk text="listings" href="/profile/listings" />

          <li className="text-center shadow-md">
            <SignoutBtn className="block size-full rounded-md bg-red-500 px-3 py-2 font-medium capitalize text-white transition-all hover:bg-red-400" />
          </li>
        </ul>
      </aside>

      {children}
    </div>
  );
}

export default layout;
