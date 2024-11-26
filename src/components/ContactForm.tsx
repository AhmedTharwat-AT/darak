"use client";

import { useActionState } from "react";
import { HiUser } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { Button } from "./ui/button";
import { DictionaryType } from "@/app/[locale]/dictionaries";

function ContactForm({ dictionary }: { dictionary: DictionaryType }) {
  // const[state,formAction,isPending]=useActionState()

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
    <form className="mt-6 w-full max-w-[700px]">
      <div className="flex justify-stretch gap-4 max-md:flex-col max-md:gap-5">
        <div className="w-full">
          <label className="mb-1 block capitalize">{name}</label>
          <div className="flex items-center rounded-md border border-gray-300 bg-white ps-2">
            <HiUser className="text-xl text-gray-400" />
            <input
              placeholder={name_placeholder}
              type="text"
              className="h-full w-full p-3 ps-2 placeholder:capitalize"
            />
          </div>
        </div>

        <div className="w-full">
          <label className="mb-1 block capitalize">{email}</label>
          <div className="flex items-center rounded-md border border-gray-300 bg-white ps-2">
            <MdEmail className="text-xl text-gray-400" />
            <input
              placeholder={email_placeholder}
              type="email"
              className="h-full w-full p-3 ps-2 placeholder:capitalize"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 w-full">
        <label className="mb-1 block capitalize">{message}</label>
        <textarea
          rows={6}
          placeholder={message_placeholder}
          className="h-full w-full rounded-md border border-gray-300 bg-white p-3 ps-2 placeholder:capitalize focus:outline-none"
        />
      </div>

      <Button disabled type="submit" className="mt-4 uppercase">
        {submit}
      </Button>
    </form>
  );
}

export default ContactForm;
