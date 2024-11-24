import { cn } from "@/lib/utils";
import { FaChevronLeft } from "react-icons/fa6";
import AnimatedLink from "./AnimatedLink";

function BackButton({
  text,
  className,
  href = "/properties",
  iconStyle,
}: {
  text: string;
  className?: string;
  href?: string;
  iconStyle?: string;
}) {
  return (
    <AnimatedLink
      className={cn(
        "mr-auto flex w-fit items-center gap-2 text-xl uppercase text-main rtl:flex-row-reverse",
        className,
      )}
      href={href}
    >
      <FaChevronLeft
        className={cn(
          "size-5 rounded-full bg-main/40 p-1 text-main",
          iconStyle,
        )}
      />

      <span className="hover:underline">{text}</span>
    </AnimatedLink>
  );
}

export default BackButton;
