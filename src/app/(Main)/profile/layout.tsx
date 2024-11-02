import Link from "next/link";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="container grid grid-cols-[auto_1fr] pt-8 font-poppins">
      <ul className="w-40 border-r border-gray-500 capitalize">
        <li>
          <Link href="/profile">profile</Link>
        </li>
        <li>
          <Link href="/profile/listings">listings</Link>
        </li>
        <li>
          <Link href="/profile/settings">settings</Link>
        </li>
        <li>
          <Link href="/api/auth/signout?callbackUrl=/">signout</Link>
        </li>
      </ul>

      {children}
    </div>
  );
}

export default layout;
