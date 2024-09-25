"use client";

import { FaSpinner } from "react-icons/fa6";

function loading() {
  return (
    <div className="h-full  flex justify-center items-center">
      <p>main</p>
      <FaSpinner className="animate-spin text-4xl text-main" />
    </div>
  );
}

export default loading;
