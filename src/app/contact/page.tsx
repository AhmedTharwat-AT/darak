import { Suspense } from "react";
import Data from "./Data";
import AddProperty from "./AddProperty";

function page() {
  console.log("contact page");
  return (
    <div className="px-4">
      <div className="text-xl">contact page header</div>
      <Suspense
        key={crypto.randomUUID()}
        fallback={
          <div className="text-red-500">loading data ...22223123..</div>
        }
      >
        <Data />
      </Suspense>
      <AddProperty />
    </div>
  );
}

export default page;
