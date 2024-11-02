"use client";

import Spinner from "@/components/Spinner";

function loading() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <Spinner />
      <p>loading property</p>
    </div>
  );
}

export default loading;
