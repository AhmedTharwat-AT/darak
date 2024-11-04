"use client";

import { useActionState } from "react";
import { HiUser } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { Button } from "./ui/button";

function ContactForm() {
  // const[state,formAction,isPending]=useActionState()
  return (
    <form className="mt-6 w-full max-w-[700px]">
      <div className="flex justify-stretch gap-4 max-md:flex-col max-md:gap-5">
        <div className="w-full">
          <label className="mb-1 block capitalize">name</label>
          <div className="flex items-center rounded-md border border-gray-300 bg-white ps-2">
            <HiUser className="text-xl text-gray-400" />
            <input
              placeholder="Enter Your Name"
              type="text"
              className="h-full w-full p-3 ps-2"
            />
          </div>
        </div>

        <div className="w-full">
          <label className="mb-1 block capitalize">email</label>
          <div className="flex items-center rounded-md border border-gray-300 bg-white ps-2">
            <MdEmail className="text-xl text-gray-400" />
            <input
              placeholder="Enter Your E-mail"
              type="email"
              className="h-full w-full p-3 ps-2"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 w-full">
        <label className="mb-1 block capitalize">message</label>
        <textarea
          rows={6}
          placeholder="Type Your Message Here"
          className="h-full w-full rounded-md border border-gray-300 bg-white p-3 ps-2 focus:outline-none"
        />
      </div>

      <Button disabled type="submit" className="mt-4 uppercase">
        submit
      </Button>
    </form>
  );
}

export default ContactForm;
