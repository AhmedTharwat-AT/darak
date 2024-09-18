import { NextResponse } from "next/server";
import { auth } from "../auth";

const authPages = ["/signin", "/signup"];

export const middleware = auth(async (req) => {
  const pathname = req.nextUrl.pathname;
  const isAuth = req.auth;

  if (authPages.includes(pathname) && isAuth) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
