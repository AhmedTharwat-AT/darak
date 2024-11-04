"use client";

import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { remvoeBookmarked, bookmarkProperty } from "@/actions/properties";

import { ImCross } from "react-icons/im";

import { CiBookmark } from "react-icons/ci";
import Spinner from "@/components/Spinner";
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
  const { toast } = useToast();
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
  }, [state, toast]);

  return (
    <form action={formAction}>
      <button
        disabled={isPending}
        className={cn(
          "flex size-11 items-center justify-center rounded-lg shadow-md transition-all",
          isAdding
            ? "border border-gray-300 bg-bgDark hover:border-alt hover:bg-alt hover:text-white"
            : "size-12 bg-red-500 text-white hover:bg-red-700",
          className,
        )}
      >
        {isPending ? (
          <ImSpinner2 className="animate-spin text-3xl" />
        ) : isAdding ? (
          <CiBookmark className="text-3xl" />
        ) : (
          <ImCross className="text-3xl" />
        )}
      </button>
    </form>
  );
}

export default BookmarkActionBtn;
