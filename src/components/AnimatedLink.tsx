"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useAnimation } from "@/context/AnimationProvider";

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
  const pathname = usePathname();
  const { setIsAnimating, startTransition, isAnimating } = useAnimation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === href || isAnimating) return;

    setIsAnimating(true);

    // prefetching the next page while displaying the exit animation
    router.prefetch(href);

    setTimeout(() => {
      startTransition(() => {
        router.push(href);
      });
    }, 200);
  };

  return (
    <Link className={className} href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}
