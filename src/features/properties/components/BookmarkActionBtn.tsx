"use client";

import { bookmarkProperty, removeBookmarked } from "@/actions/properties";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { CiBookmark } from "react-icons/ci";
import { GoBookmarkSlashFill } from "react-icons/go";
import { ImSpinner2 } from "react-icons/im";

function BookmarkActionBtn({
  propertyId,
  className,
  type,
}: {
  propertyId: string;
  className?: string;
  type: "add" | "remove";
}) {
  const isAdding = type === "add";
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    isAdding ? bookmarkProperty : removeBookmarked,
    {
      propertyId,
      message: "",
    },
  );

  useEffect(() => {
    if (!state.message) return;

    toast({
      description: state.message,
      variant: "app",
      className: "text-black p-5",
      uniqueId: "bookmark-property",
    });

    router.refresh();
  }, [state, router]);

  return (
    <form action={formAction} className="m-0 p-0">
      <button
        disabled={isPending}
        title={`${isAdding ? "Bookmark" : "Unbookmark"} Property`}
        className={cn(
          "flex size-11 items-center justify-center rounded-lg shadow-md transition-all",
          isAdding
            ? "border border-gray-300 bg-bgDark hover:border-alt hover:bg-alt hover:text-white"
            : "bg-red-500 text-white hover:bg-red-700",
          className,
        )}
      >
        {isPending ? (
          <ImSpinner2 className="animate-spin text-2xl" />
        ) : isAdding ? (
          <CiBookmark className="text-3xl" />
        ) : (
          <GoBookmarkSlashFill className="text-3xl" />
        )}
      </button>
    </form>
  );
}

export default BookmarkActionBtn;
