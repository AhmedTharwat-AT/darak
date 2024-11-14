"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { bookmarkProperty, remvoeBookmarked } from "@/actions/properties";
import { cn } from "@/lib/utils";

import { CiBookmark } from "react-icons/ci";
import { ImSpinner2, ImCross } from "react-icons/im";

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
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    isAdding ? bookmarkProperty : remvoeBookmarked,
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
    });
    router.refresh();
  }, [state, toast, router]);

  return (
    <form className="m-0 p-0" action={formAction}>
      <button
        disabled={isPending}
        title={`${isAdding ? "Bookmark" : "Remove"} Property`}
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
          <ImCross className="text-2xl" />
        )}
      </button>
    </form>
  );
}

export default BookmarkActionBtn;
