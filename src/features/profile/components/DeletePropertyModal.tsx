"use client";

import { deleteProperty } from "@/actions/properties";
import { useToast } from "@/hooks/use-toast";
import { useActionState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImSpinner2 } from "react-icons/im";

function DeletePropertyModal({
  propertyId,
  onCloseModal,
}: {
  propertyId: string;
  onCloseModal: () => void;
}) {
  const { toast } = useToast();
  const toastId = useRef<string>(null);
  const [state, formAction, isPending] = useActionState(deleteProperty, {
    propertyId,
    message: "",
    type: "",
  });

  useEffect(() => {
    if (!state.message || toastId.current) return;

    if (state.type === "success") {
      const { id } = toast({
        description: state.message,
        variant: "app",
        className: "text-black p-5",
      });
      toastId.current = id;
    } else {
      const { id } = toast({
        description: state.message,
        variant: "destructive",
        className: "text-white p-5",
      });
      toastId.current = id;
    }

    onCloseModal();
  }, [state.message, toast, onCloseModal, state.type]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Delete property ?</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this property ?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="flex flex-row justify-center gap-2">
        <form action={formAction}>
          <Button
            disabled={isPending}
            variant={"destructive"}
            title="Delete Property"
            className="w-[72px]"
          >
            {isPending ? (
              <ImSpinner2 className="animate-spin text-xl" />
            ) : (
              "Delete"
            )}
          </Button>
        </form>

        <DialogClose asChild>
          <Button className="capitalize" variant={"ghost"}>
            cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}

export default DeletePropertyModal;
