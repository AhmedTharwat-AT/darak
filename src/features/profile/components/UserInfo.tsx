"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { editUserInfo } from "@/actions/profile";
import { isRedirectError } from "next/dist/client/components/redirect";
import { EditUserInfoSchema, editUserInfoSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserWithProperties } from "@/lib/types";

import UpdateProfileImage from "./UpdateProfileImage";
import ErrorField from "@/components/form/ErrorField";
import Label from "@/components/form/Label";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function UserInfo({ user }: { user: UserWithProperties }) {
  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState({
    status: "",
    message: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<EditUserInfoSchema>({
    defaultValues: {
      email: user.email,
      name: user.name || "",
      phone: user.phone || "",
      whatsapp: user.whatsapp || "",
    },
    resolver: zodResolver(editUserInfoSchema),
  });

  async function onSubmit(data: EditUserInfoSchema) {
    if (!isDirty) return;
    try {
      const message = await editUserInfo(data);
      setServerError(message);
    } catch (err) {
      if (isRedirectError(err)) throw err;

      setServerError({
        status: "failed",
        message: "Something went wrong!",
      });
    }
  }

  const pending = isSubmitting || !isEditing;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-4 space-y-4 rounded-md border border-gray-300 bg-gray-200 p-4 shadow-md"
    >
      <UpdateProfileImage user={user} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <Label name="Name" />
          <Input disabled={pending} {...register("name")} />
          <ErrorField message={errors?.name?.message} />
        </div>
        <div>
          <Label name="Email" />
          <Input disabled={true} {...register("email")} />
          <ErrorField message={errors?.email?.message} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <Label name="Phone" />
          <Input disabled={pending} {...register("phone")} />
          <ErrorField message={errors?.phone?.message} />
        </div>
        <div>
          <Label name="Whatsapp" />
          <Input disabled={pending} {...register("whatsapp")} />
          <ErrorField message={errors?.whatsapp?.message} />
        </div>
      </div>
      {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <Label name="Password" />
          <Input disabled={pending} {...register("password")} />
        </div>
        <div>
          <Label name="Confirm Password" />
          <Input disabled={pending} {...register("confirm_password")} />
        </div>
      </div> */}
      <div className="w-full pt-5 lg:pt-3">
        <ErrorField message={serverError.message} />
        {isEditing ? (
          <div className="space-y-2">
            <Button
              disabled={isSubmitting}
              className="flex h-11 w-full items-center justify-center text-lg uppercase hover:bg-main/90"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
            >
              {isSubmitting ? (
                <Spinner className="text-2xl text-white" />
              ) : (
                "Save"
              )}
            </Button>
            <Button
              disabled={isSubmitting}
              variant={"ghost"}
              className="flex h-11 w-full items-center justify-center text-lg uppercase"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(false);
                reset();
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            disabled={isSubmitting || isEditing}
            className="flex h-11 w-full items-center justify-center text-lg uppercase hover:bg-main/90"
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);
            }}
          >
            Edit
          </Button>
        )}
      </div>
    </form>
  );
}

export default UserInfo;
