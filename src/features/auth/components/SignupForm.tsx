"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { createUser } from "@/actions/auth";
import { RegisterSchema, registerSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import { FaLock } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { isRedirectError } from "next/dist/client/components/redirect";
import { toast } from "@/hooks/use-toast";
import ErrorField from "@/components/form/ErrorField";

function SignupForm() {
  const [serverError, setServerError] = useState("");
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(data: RegisterSchema) {
    try {
      const state = await createUser(data);
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
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {serverError && <ErrorField message={serverError} />}

      <div>
        <label className="mb-1 block">Email</label>
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

        {errors.email && <ErrorField message={errors.email.message} />}
      </div>

      <div>
        <label className="mb-1 block">Name</label>
        <div className="relative">
          <FaUserAlt className="absolute left-3 top-1/2 size-5 -translate-y-1/2 fill-stroke" />
          <input
            disabled={isSubmitting}
            className="w-full rounded-lg border border-stroke py-4 pe-4 ps-10 focus:border-main"
            {...register("name")}
            type="text"
            placeholder="Enter your name"
          />
        </div>

        {errors.name && <ErrorField message={errors.name.message} />}
      </div>

      <div>
        <label className="mb-1 block">Phone</label>
        <div className="relative">
          <FaPhoneAlt className="absolute left-3 top-1/2 size-5 -translate-y-1/2 fill-stroke" />
          <input
            disabled={isSubmitting}
            className="w-full rounded-lg border border-stroke py-4 pe-4 ps-10 focus:border-main"
            {...register("phone")}
            type="text"
            placeholder="Enter your phone"
          />
        </div>

        {errors.phone && <ErrorField message={errors.phone.message} />}
      </div>

      <div>
        <label className="mb-1 block">Password</label>
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

        {errors.password && <ErrorField message={errors.password.message} />}
      </div>

      <div>
        <label className="mb-1 block">Confirm Password</label>
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
          <ErrorField message={errors.confirm_password.message} />
        )}
      </div>

      <Button
        disabled={isSubmitting}
        className="!mt-8 h-14 w-full bg-main py-4 text-xl transition-all hover:opacity-90 hover:shadow-md"
        size="lg"
      >
        {isSubmitting ? <Spinner className="text-2xl text-white" /> : "Sign up"}
      </Button>
    </form>
  );
}

export default SignupForm;
