import Spinner from "@/components/Spinner";
import CreatePropertyForm from "@/features/properties/components/CreatePropertyForm";
import { Suspense } from "react";

function page() {
  return (
    <div className="container pb-16 pt-8 font-poppins">
      <h1 className="pb-6 text-center text-2xl font-semibold capitalize text-black">
        Create new property
      </h1>
      <Suspense
        fallback={
          <div className="flex min-h-60 items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <CreatePropertyForm />
      </Suspense>
    </div>
  );
}

export default page;
