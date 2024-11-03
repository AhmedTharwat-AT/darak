import { cn } from "@/lib/utils";
import { FaChevronLeft } from "react-icons/fa6";
import AnimatedLink from "./AnimatedLink";

function BackButton({ text, className }: { text: string; className?: string }) {
  return (
    <AnimatedLink
      className={cn(
        "flex w-fit items-center gap-2 text-xl uppercase text-main",
        className,
      )}
      href="/properties"
    >
      <FaChevronLeft className="size-5 rounded-full bg-main/40 p-1 text-main" />

      <span className="hover:underline">{text}</span>
    </AnimatedLink>
  );
}

export default BackButton;
