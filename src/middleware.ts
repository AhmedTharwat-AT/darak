import { NextResponse } from "next/server";
import { auth } from "./auth";

const authPages = ["/signin", "/signup"];
const protectedPages = ["/profile", "/bookmark"];
const locales = ["en", "ar"];

export const middleware = auth(async (req) => {
  const pathname = req.nextUrl.pathname;
  const isAuth = req.auth;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  const locale = pathnameHasLocale ? pathname.split("/")[1] : "en";
  const newPathname = pathnameHasLocale ? pathname : `/en${pathname}`;

  if (isAuth && authPages.some((page) => pathname.includes(page))) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  if (!isAuth && protectedPages.some((page) => pathname.includes(page))) {
    return NextResponse.redirect(
      new URL(`/${locale}/signin?callbackUrl=${newPathname}`, req.url),
    );
  }

  if (!pathnameHasLocale) {
    const searchParams = req.nextUrl.searchParams.toString();
    const newHref = newPathname + (searchParams ? `?${searchParams}` : "");
    return NextResponse.redirect(new URL(newHref, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets|icon).*)",
  ],
};
