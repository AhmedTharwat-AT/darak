"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center font-poppins text-lg lg:text-2xl">
      <h2>Something went wrong!</h2>
      <Button className="mt-4 capitalize" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
