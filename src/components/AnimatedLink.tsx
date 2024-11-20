"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useAnimation } from "@/context/AnimationProvider";
import useLocale from "@/hooks/useLocale";

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

  const newHref = "/" + locale + href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === href || isAnimating) return;

    setIsAnimating(true);

    // prefetching the next page while displaying the exit animation
    router.prefetch(newHref);

    setTimeout(() => {
      startTransition(() => {
        router.push(newHref);
      });
    }, 200);
  };

  return (
    <Link className={className} href={newHref} prefetch onClick={handleClick}>
      {children}
    </Link>
  );
}
