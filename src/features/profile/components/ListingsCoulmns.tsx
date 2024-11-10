import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { IoMdImages } from "react-icons/io";

import { PropertyWithImages } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PropertyImage } from "@prisma/client";
import { useState } from "react";
import ListingActionBtn from "./ListingActionBtn";

const columns: ColumnDef<PropertyWithImages>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => {
      return <div>Created At</div>;
    },
    cell: ({ row }) => (
      <div className="text-start">
        {new Intl.DateTimeFormat("en-US").format(
          new Date(row.getValue("createdAt")),
        )}
      </div>
    ),
  },
  {
    accessorKey: "images",
    header: () => <div className="text-start">Images</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start gap-1 font-medium">
          <IoMdImages className="size-5 text-gray-500" />
          <span>{(row.getValue("images") as PropertyImage[])?.length}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-1 size-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div
          className={cn(
            "w-fit rounded-md bg-gray-200 p-1 text-start font-semibold capitalize",
            status == "preview" && "text-main",
            status == "approved" && "text-green-500",
            status == "refused" && "text-red-500",
          )}
        >
          {status}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const propertyId = row.original.id;
      return <ListingActionBtn propertyId={propertyId} />;
    },
  },
];

export default columns;
