"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { editUserInfo } from "@/actions/profile";
import { isRedirectError } from "next/dist/client/components/redirect";
import { EditUserInfoSchema, editUserInfoSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserWithProperties } from "@/lib/types";

import ErrorField from "@/components/form/ErrorField";
import Label from "@/components/form/Label";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProfilePicture from "./ProfilePicture";

const initialServerStatus = {
  status: "",
  message: "",
};

function UserInfo({ user }: { user: UserWithProperties }) {
  const [isEditing, setIsEditing] = useState(false);
  const [serverStatus, setServerStatus] = useState(initialServerStatus);
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
      setServerStatus(message);
    } catch (err) {
      if (isRedirectError(err)) throw err;

      setServerStatus({
        status: "failed",
        message: "Something went wrong!",
      });
    }
    setIsEditing(false);
  }

  const pending = isSubmitting || !isEditing;

  return (
    <div className="my-4 space-y-4 rounded-md border border-gray-300 bg-gray-200 p-4 shadow-md">
      <ProfilePicture user={user} />
      <form onSubmit={handleSubmit(onSubmit)} className="my-4 space-y-4">
        {serverStatus.status === "success" && (
          <p className="text-center text-green-600">{serverStatus.message}</p>
        )}
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
          {serverStatus.status === "error" && (
            <ErrorField message={serverStatus.message} />
          )}
          {isEditing ? (
            <div className="space-y-2">
              <Button
                disabled={isSubmitting}
                className="flex h-11 w-full items-center justify-center text-lg uppercase hover:bg-main/90"
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
                setServerStatus(initialServerStatus);
              }}
            >
              Edit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default UserInfo;
