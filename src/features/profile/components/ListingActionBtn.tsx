import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import { useState } from "react";
import DeletePropertyModal from "./DeletePropertyModal";
import EditPropertyModal from "./EditPropertyModal";

function ListingActionBtn() {
  const [openedDialog, setOpenedDialog] = useState<"delete" | "edit">();
  return (
    <Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DialogTrigger
            asChild
            onClick={() => {
              setOpenedDialog("delete");
            }}
          >
            <DropdownMenuItem className="cursor-pointer font-medium hover:bg-gray-100">
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger
            asChild
            onClick={() => {
              setOpenedDialog("edit");
            }}
          >
            <DropdownMenuItem className="cursor-pointer font-medium hover:bg-gray-100">
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        {openedDialog === "delete" ? (
          <DeletePropertyModal />
        ) : (
          <EditPropertyModal />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ListingActionBtn;
