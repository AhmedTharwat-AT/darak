"use client";

import { createUser } from "@/actions/auth";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { RegisterSchema, registerSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

function SignupForm({ callbackUrl }: { callbackUrl?: string | undefined }) {
  const [serverError, setServerError] = useState("");
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(data: RegisterSchema) {
    try {
      await createUser(data);
    } catch (err) {
      if (err instanceof Error) {
        setServerError(err.message);
      }
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {serverError && <p className="lowercase text-red-500">{serverError}</p>}
      <div>
        <label className="mb-2 block">Email</label>
        <div className="relative">
          <IoMdMail className="absolute left-3 top-1/2 size-5 -translate-y-1/2 fill-stroke" />
          <input
            disabled={isSubmitting}
            className="w-full rounded-lg border border-stroke py-4 pe-4 ps-10 focus:border-main"
            {...register("email")}
            type="email"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="lowercase text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block">Name</label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 size-5 -translate-y-1/2 fill-stroke" />
          <input
            disabled={isSubmitting}
            className="w-full rounded-lg border border-stroke py-4 pe-4 ps-10 focus:border-main"
            {...register("name")}
            type="text"
            placeholder="Enter your name"
          />
        </div>
        {errors.name && (
          <p className="lowercase text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block">Password</label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 size-5 -translate-y-1/2 fill-stroke" />
          <input
            disabled={isSubmitting}
            className="w-full rounded-lg border border-stroke py-4 pe-4 ps-10 focus:border-main"
            {...register("password")}
            type="password"
            placeholder="Enter your password"
          />
        </div>
        {errors.password && (
          <p className="lowercase text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block">Confirm Password</label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 size-5 -translate-y-1/2 fill-stroke" />
          <input
            disabled={isSubmitting}
            className="w-full rounded-lg border border-stroke py-4 pe-4 ps-10 focus:border-main"
            {...register("confirm_password")}
            type="password"
            placeholder="Confirm your password"
          />
        </div>
        {errors.confirm_password && (
          <p className="lowercase text-red-500">
            {errors.confirm_password.message}
          </p>
        )}
      </div>
      {/* <input name="callbackUrl" type="hidden" defaultValue={callbackUrl} /> */}
      <Button
        disabled={isSubmitting}
        className="h-14 w-full py-4 text-xl"
        size="lg"
      >
        {isSubmitting ? <Spinner className="text-2xl text-white" /> : "Sign up"}
      </Button>
    </form>
  );
}

export default SignupForm;
