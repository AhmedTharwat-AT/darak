"use client";

import { signinAction } from "@/actions/auth";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { LoginSchema, loginSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

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
      callbackUrl,
    },
  });

  async function onSubmit(data: LoginSchema) {
    try {
      const state = await signinAction(data);
      const isError = state?.type === "error";

      toast({
        title: state.message,
        variant: isError ? "destructive" : "default",
      });

      if (isError) setServerError(state.message);
    } catch (err) {
      if (isRedirectError(err)) throw err;

      setServerError("Something went wrong!");
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
      {/* <input name="callbackUrl" type="hidden" defaultValue={callbackUrl} /> */}
      <Button
        disabled={isSubmitting}
        className="!mt-8 h-14 w-full py-4 text-xl transition-all hover:opacity-90 hover:shadow-md"
        size="lg"
      >
        {isSubmitting ? <Spinner className="text-2xl text-white" /> : "Login"}
      </Button>
    </form>
  );
}

export default LoginForm;
