"use client";

import { deleteProperty } from "@/actions/properties";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useActionState, useEffect } from "react";

import { ImCross } from "react-icons/im";
import { ImSpinner2 } from "react-icons/im";

function DeletePropertyBtn({
  propertyId,
  className,
}: {
  propertyId: string;
  className?: string;
}) {
  const { toast } = useToast();
  const [state, formAction, isPending] = useActionState(deleteProperty, {
    propertyId,
    message: "",
  });

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
          "flex size-10 items-center justify-center rounded-lg bg-red-500 text-white shadow-md transition-all hover:bg-red-700",
          className,
        )}
      >
        {isPending ? (
          <ImSpinner2 className="animate-spin text-3xl" />
        ) : (
          <ImCross className="text-2xl" />
        )}
      </button>
    </form>
  );
}

export default DeletePropertyBtn;
