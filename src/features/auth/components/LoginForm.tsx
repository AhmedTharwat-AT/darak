"use client";

import { useActionState, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { signinAction } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "@/lib/zodSchemas";
import { validateEmail } from "@/lib/utils";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { FaLock } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { isRedirectError } from "next/dist/client/components/redirect";

function LoginForm({ callbackUrl }: { callbackUrl?: string | undefined }) {
  const [serverError, setServerError] = useState("");
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const pending = isSubmitting;

  async function onSubmit(data: LoginSchema) {
    try {
      await signinAction(data);
    } catch (err) {
      if (err instanceof Error && !isRedirectError(err)) {
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
            disabled={pending}
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
        <label className="mb-2 block">Password</label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 size-5 -translate-y-1/2 fill-stroke" />
          <input
            disabled={pending}
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
      {/* <input name="callbackUrl" type="hidden" defaultValue={callbackUrl} /> */}
      <Button disabled={pending} className="h-14 w-full py-4 text-xl" size="lg">
        {pending ? <Spinner className="text-2xl text-white" /> : "Login"}
      </Button>
    </form>
  );
}

export default LoginForm;