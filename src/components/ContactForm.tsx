"use client";

import { sendMessage } from "@/actions/contact";
import { DictionaryType } from "@/app/[locale]/dictionaries";
import { ContactSchema, contactSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiUser } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import ErrorField from "./form/ErrorField";
import Spinner from "./Spinner";
import { Button } from "./ui/button";

function ContactForm({ dictionary }: { dictionary: DictionaryType }) {
  const [serverState, setServerState] = useState({
    type: "",
    message: "",
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactSchema) {
    const message = await sendMessage(data);
    setServerState(message);
    if (message.type === "success") reset();
  }

  const isError = serverState.type === "error";

  const {
    name,
    email,
    message,
    submit,
    name_placeholder,
    message_placeholder,
    email_placeholder,
  } = dictionary.contact;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 w-full max-w-[700px]"
    >
      {serverState.message && (
        <div
          className={`rounded-md py-2 font-semibold tracking-wide ${isError ? "text-red-500" : "text-green-500"}`}
        >
          {serverState.message}
        </div>
      )}

      <div className="flex justify-stretch gap-4 max-md:flex-col max-md:gap-5">
        <div className="w-full">
          <label htmlFor="name" className="mb-1 block capitalize">
            {name}
          </label>
          <div className="flex items-center rounded-md border border-gray-300 bg-white ps-2">
            <HiUser className="text-xl text-gray-400" />
            <input
              placeholder={name_placeholder}
              type="text"
              className="h-full w-full p-3 ps-2 placeholder:capitalize"
              {...register("name")}
            />
          </div>

          {errors.name && <ErrorField message={errors.name.message} />}
        </div>

        <div className="w-full">
          <label htmlFor="email" className="mb-1 block capitalize">
            {email}
          </label>
          <div className="flex items-center rounded-md border border-gray-300 bg-white ps-2">
            <MdEmail className="text-xl text-gray-400" />
            <input
              placeholder={email_placeholder}
              type="email"
              className="h-full w-full p-3 ps-2 placeholder:capitalize"
              {...register("email")}
            />
          </div>

          {errors.email && <ErrorField message={errors.email.message} />}
        </div>
      </div>

      <div className="mt-4 w-full">
        <label htmlFor="message" className="mb-1 block capitalize">
          {message}
        </label>
        <textarea
          rows={6}
          placeholder={message_placeholder}
          className="h-full w-full rounded-md border border-gray-300 bg-white p-3 ps-2 placeholder:capitalize focus:outline-none"
          {...register("message")}
        />

        {errors.message && <ErrorField message={errors.message.message} />}
      </div>

      <Button disabled={isSubmitting} type="submit" className="mt-4 uppercase">
        {isSubmitting ? <Spinner className="text-xl text-white" /> : submit}
      </Button>
    </form>
  );
}

export default ContactForm;
