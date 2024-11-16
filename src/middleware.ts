import { NextResponse } from "next/server";
import { auth, signOut } from "./auth";
import { getUser } from "./services/prismaApi";

const authPages = ["/signin", "/signup"];
const protectedPages = ["/profile", "/bookmark"];

export const middleware = auth(async (req) => {
  const pathname = req.nextUrl.pathname;
  const isAuth = req.auth;

  if (authPages.includes(pathname) && isAuth) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (protectedPages.includes(pathname) && !isAuth) {
    return NextResponse.redirect(
      new URL(`/signin?callbackUrl=${pathname}`, req.url),
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets|icon).*)",
  ],
};
