import { getProperties } from "@/lib/services";
import { Suspense } from "react";

import PropertiesFilter from "@/components/PropertiesFilter";
import PropertiesList from "@/components/PropertiesList";

async function properties() {
  const properties = getProperties();

  return (
    <div className=" my-[3.5rem] relative">
      <div className="container flex gap-8 md:flex-nowrap flex-wrap max-lg:justify-center">
        <PropertiesFilter />

        <Suspense
          key={crypto.randomUUID()}
          fallback={<div className="grow">Loading...</div>}
        >
          <PropertiesList properties={properties} />
        </Suspense>
      </div>
    </div>
  );
}

export default properties;
