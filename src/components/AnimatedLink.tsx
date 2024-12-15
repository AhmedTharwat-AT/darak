"use client";

import { useAnimation } from "@/context/AnimationProvider";
import useLocale from "@/hooks/useLocale";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function AnimatedLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const { pathname, locale } = useLocale();
  const { setIsAnimating, startTransition, isAnimating } = useAnimation();

  let newHref = "";

  if (href === "/") newHref = `/${locale}`;
  else newHref = `/${locale}${href}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (pathname === newHref || isAnimating) return;

    setIsAnimating(true);

    // prefetching the next page while displaying the exit animation
    router.prefetch(newHref);

    // a delay untill the exit animations ends
    setTimeout(() => {
      startTransition(() => {
        router.push(newHref);
      });
    }, 210);
  };

  return (
    <Link className={className} href={newHref} prefetch onClick={handleClick}>
      {children}
    </Link>
  );
}
