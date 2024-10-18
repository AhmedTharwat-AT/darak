"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useTransition } from "react";
import { useAnimation } from "./AnimationProvider";

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
  const { isAnimating, setIsAnimating } = useAnimation();
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === href) return;

    setIsAnimating(true);
    // prefetching the next page while displaying the exit animation
    router.prefetch(href);

    setTimeout(() => {
      startTransition(() => {
        console.log("start transition");
        router.push(href);
      });
    }, 200); // This should match your exit animation duration
  };

  // once the transition ends , the new route is fetched and ready to be displayed
  useEffect(() => {
    if (!isPending) {
      console.log("done transition");
      setIsAnimating(false);
    }
  }, [isPending, setIsAnimating]);

  return (
    <Link className={className} href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}
