"use client";

import { editUserInfo } from "@/actions/profile";
import { EditUserInfoSchema, editUserInfoSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useState } from "react";
import { useForm } from "react-hook-form";

import ErrorField from "@/components/form/ErrorField";
import Label from "@/components/form/Label";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import ProfilePicture from "./ProfilePicture";
import { removePhoneFormat } from "@/lib/utils";
import { DictionaryType } from "@/app/[locale]/dictionaries";

const initialServerStatus = {
  status: "",
  message: "",
};

function UserInfo({
  user,
  dictionary,
}: {
  user: User;
  dictionary: DictionaryType;
}) {
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
      phone: user.phone ? removePhoneFormat(user.phone) : "",
      whatsapp: user.whatsapp ? removePhoneFormat(user.whatsapp) : "",
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

  const { name, email, phone, whatsapp, edit } = dictionary.profile.account;

  return (
    <div className="my-4 space-y-4 rounded-md border border-gray-300 bg-gray-200 p-4 shadow-md">
      <ProfilePicture user={user} />

      <form onSubmit={handleSubmit(onSubmit)} className="my-4 space-y-4">
        {serverStatus.status === "success" && (
          <p className="text-center text-green-600">{serverStatus.message}</p>
        )}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>
            <Label name={name} />
            <Input disabled={pending} {...register("name")} />
            <ErrorField message={errors?.name?.message} />
          </div>
          <div>
            <Label name={email} />
            <Input disabled={true} {...register("email")} />
            <ErrorField message={errors?.email?.message} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>
            <Label name={phone} />
            <Input disabled={pending} {...register("phone")} />
            <ErrorField message={errors?.phone?.message} />
          </div>
          <div>
            <Label name={whatsapp} />
            <Input disabled={pending} {...register("whatsapp")} />
            <ErrorField message={errors?.whatsapp?.message} />
          </div>
        </div>

        <div className="w-full pt-5 lg:pt-3">
          {serverStatus.status === "error" && (
            <ErrorField message={serverStatus.message} />
          )}

          {isEditing ? (
            <div className="space-y-2">
              <Button
                disabled={isSubmitting}
                className="flex h-10 w-full items-center justify-center uppercase hover:bg-main/90"
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
                className="flex h-10 w-full items-center justify-center uppercase"
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
              className="flex h-10 w-full items-center justify-center uppercase hover:bg-main/90 rtl:tracking-wider"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
                setServerStatus(initialServerStatus);
              }}
            >
              {edit}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default UserInfo;
