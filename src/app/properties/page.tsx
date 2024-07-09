import PropertiesFilter from "@/components/PropertiesFilter";
import { Suspense } from "react";

function properties() {
  return (
    <div className=" my-[3.5rem]">
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <PropertiesFilter />
        </Suspense>
      </div>
    </div>
  );
}

export default properties;
