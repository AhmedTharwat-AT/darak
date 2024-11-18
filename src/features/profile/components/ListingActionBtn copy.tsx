// "use client";

// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal } from "lucide-react";

// import { useState } from "react";
// import DeletePropertyModal from "./DeletePropertyModal";
// import EditPropertyModal from "./EditPropertyModal";

// function ListingActionBtn({ propertyId }: { propertyId: string }) {
//   const [openedDialog, setOpenedDialog] = useState<"delete" | "edit">();
//   const [open, setOpen] = useState(false);

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DropdownMenu modal={false}>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="h-8 w-8 p-0">
//             <span className="sr-only">Open menu</span>
//             <MoreHorizontal />
//           </Button>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent align="end">
//           <DialogTrigger
//             asChild
//             onClick={() => {
//               setOpenedDialog("delete");
//             }}
//           >
//             <DropdownMenuItem className="cursor-pointer font-medium hover:bg-gray-100">
//               Delete
//             </DropdownMenuItem>
//           </DialogTrigger>

//           <DialogTrigger
//             asChild
//             onClick={() => {
//               setOpenedDialog("edit");
//             }}
//           >
//             <DropdownMenuItem className="cursor-pointer font-medium hover:bg-gray-100">
//               Edit
//             </DropdownMenuItem>
//           </DialogTrigger>
//         </DropdownMenuContent>
//       </DropdownMenu>
//       <DialogContent className="rounded-lg max-sm:w-fit max-sm:min-w-[90vw]">
//         {openedDialog === "delete" ? (
//           <DeletePropertyModal
//             propertyId={propertyId}
//             onCloseModal={() => setOpen(false)}
//           />
//         ) : (
//           <EditPropertyModal />
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default ListingActionBtn;
