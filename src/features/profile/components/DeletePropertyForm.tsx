"use client";

import { deleteProperty } from "@/actions/properties";
import { toast } from "@/hooks/use-toast";
import { useActionState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { ImSpinner2 } from "react-icons/im";

function DeletePropertyForm({
  propertyId,
  onCloseModal,
}: {
  propertyId: string;
  onCloseModal: () => void;
}) {
  const action = deleteProperty.bind(null, { propertyId });
  const [state, formAction, isPending] = useActionState(action, {
    message: "",
    type: "",
  });

  const isError = state.type === "error";

  useEffect(() => {
    if (!state.message) return;

    toast({
      description: state.message,
      variant: isError ? "destructive" : "app",
      className: isError ? "text-white p-5" : "text-black p-5",
      uniqueId: "delete-property",
    });

    onCloseModal();
  }, [state.message, onCloseModal, state.type, isError]);

  return (
    <form action={formAction}>
      <Button
        disabled={isPending}
        variant={"destructive"}
        title="Delete Property"
        className="w-[72px]"
      >
        {isPending ? <ImSpinner2 className="animate-spin text-xl" /> : "Delete"}
      </Button>
    </form>
  );
}

export default DeletePropertyForm;
