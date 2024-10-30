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
    <div className="container flex items-center justify-center text-lg lg:text-2xl flex-col font-poppins">
      <h2>Something went wrong!</h2>
      <Button className="capitalize mt-4" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
