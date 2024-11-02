"use client";

import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { signinAction } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, formSchema } from "@/lib/zodSchemas";
import { validateEmail } from "@/lib/utils";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { FaLock } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

function CredentialForm({ callbackUrl }: { callbackUrl?: string | undefined }) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [serverError, formAction, isPending] = useActionState(
    signinAction,
    undefined,
  );
  const [loading, startTransition] = useTransition();

  const pending = isSubmitting || isPending || loading;

  function onSubmit(data: FormSchema) {
    startTransition(() => formAction({ ...data, callbackUrl }));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {serverError?.error && (
        <p className="lowercase text-red-500">{serverError.error}</p>
      )}
      <div className="mb-6">
        <label className="mb-2 block">Email</label>
        <div className="relative">
          <IoMdMail className="absolute left-3 top-1/2 size-5 -translate-y-1/2 fill-stroke" />
          <input
            disabled={pending}
            className="w-full rounded-lg border border-stroke py-4 pe-4 ps-10 focus:border-main"
            {...register("email", {
              validate: (data) => validateEmail(data) || "invalid email!",
            })}
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
            {...register("password", {
              minLength: {
                value: 8,
                message: "Password must be 8 chars or greater!",
              },
            })}
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
        disabled={pending}
        className="my-6 h-14 w-full py-4 text-xl"
        size="lg"
      >
        {pending ? <Spinner className="text-2xl text-white" /> : "Login"}
      </Button>
    </form>
  );
}

export default CredentialForm;
