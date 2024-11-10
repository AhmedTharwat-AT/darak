"use client";

import { useActionState, useState } from "react";
import { changeProfilePicture } from "@/actions/profile";
import { User } from "@prisma/client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import Spinner from "@/components/Spinner";

function ChangePictureForm({ user }: { user: User }) {
  const [image, setImage] = useState<File | null>(null);
  const [state, formAction, isPending] = useActionState(changeProfilePicture, {
    status: "",
    message: "",
  });

  return (
    <form action={formAction} className="space-y-4">
      <Input
        name="image"
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="cursor-pointer border-gray-300 transition-all hover:bg-gray-300"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      {/* preview */}
      {image && (
        <div className="relative min-h-60 overflow-hidden rounded-md">
          <Image
            src={URL.createObjectURL(image)}
            alt="preview"
            fill
            className="object-cover"
          />
        </div>
      )}
      {state.status && (
        <p
          className={`text-sm ${state.status === "error" ? "text-red-600" : "text-green-600"}`}
        >
          {state.message}
        </p>
      )}

      <div className="flex h-11 justify-center gap-4 sm:justify-end">
        <DialogClose asChild>
          <Button variant={"outline"}>Cancel</Button>
        </DialogClose>
        {image && (
          <Button disabled={isPending}>
            {isPending ? <Spinner className="text-xl text-white" /> : "Save"}
          </Button>
        )}
      </div>
    </form>
  );
}

export default ChangePictureForm;
