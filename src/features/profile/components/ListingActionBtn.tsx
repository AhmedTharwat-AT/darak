"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DeletePropertyModal from "./DeletePropertyModal";

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
        <DeletePropertyModal
          propertyId={propertyId}
          onCloseModal={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ListingActionBtn;
