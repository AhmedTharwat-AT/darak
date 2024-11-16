"use client";

import { useEffect, useRef, useState } from "react";
import { signoutAction } from "@/actions/auth";
import { MdErrorOutline } from "react-icons/md";

function SignoutWhenUserDeleted() {
  const [timer, setTimer] = useState(5);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer <= 0) {
        formRef.current?.requestSubmit();
        clearInterval(interval);
      } else {
        setTimer((t) => t - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      signoutAction();
    };
  }, [timer]);

  return (
    <form
      action={signoutAction}
      ref={formRef}
      className="my-4 flex min-h-32 flex-col items-center justify-center gap-3 rounded-md bg-gray-100 p-2 text-center font-poppins"
    >
      <div className="flex items-center gap-1">
        <MdErrorOutline className="size-5 text-red-500" />
        <h1 className="text-start font-bold text-red-500 sm:text-lg">
          Something went wrong!
        </h1>
      </div>
      <p className="max-sm:text-sm">Signing out in {timer}</p>
    </form>
  );
}

export default SignoutWhenUserDeleted;
