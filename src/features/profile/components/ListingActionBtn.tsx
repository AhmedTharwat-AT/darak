"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeletePropertyForm from "./DeletePropertyForm";

function ListingActionBtn({ propertyId }: { propertyId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-lg max-sm:w-fit max-sm:min-w-[90vw]">
        <DialogHeader>
          <DialogTitle>Delete property?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this property?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row justify-center gap-2">
          <DeletePropertyForm
            propertyId={propertyId}
            onCloseModal={() => setOpen(false)}
          />

          <DialogClose asChild>
            <Button className="capitalize" variant={"ghost"}>
              cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ListingActionBtn;
