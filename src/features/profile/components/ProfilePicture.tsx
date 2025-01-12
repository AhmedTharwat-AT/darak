import { User } from "@prisma/client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RiImageAddFill } from "react-icons/ri";
import ChangePictureForm from "./ChangePictureForm";
import defauleProfile from "@/assets/profile.jpg";

function ProfilePicture({ user }: { user: User }) {
  return (
    <div className="mb-4 flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <button className="group relative overflow-hidden rounded-full">
            <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-gray-500 bg-opacity-0 transition group-hover:bg-opacity-50">
              <RiImageAddFill className="text-5xl text-white opacity-0 transition group-hover:opacity-100" />
            </div>
            <Image
              src={user.image || defauleProfile}
              width={200}
              height={200}
              alt={user.name || "user"}
              className="aspect-square rounded-full border-4 border-main object-cover shadow-lg"
            />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Profile Picture</DialogTitle>
            <DialogDescription>Select a new profile picture </DialogDescription>
          </DialogHeader>
          <ChangePictureForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProfilePicture;
