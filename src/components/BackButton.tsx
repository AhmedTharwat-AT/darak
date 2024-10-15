import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

function BackButton({ text, className }: { text: string; className?: string }) {
  return (
    <Link
      className={cn(
        "text-xl w-fit text-main gap-2 uppercase flex items-center",
        className
      )}
      href="/properties"
    >
      <FaChevronLeft className="size-5 rounded-full text-main bg-main/40 p-1" />

      <span className=" hover:underline">{text}</span>
    </Link>
  );
}

export default BackButton;
