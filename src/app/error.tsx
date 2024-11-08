"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container flex min-h-screen flex-col items-center justify-center font-poppins text-lg lg:text-2xl">
      <h2>Something went wrong!</h2>
      <p className="max-w-[400px] break-all text-sm">{error.message}</p>
      <Button className="mt-4 capitalize" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
