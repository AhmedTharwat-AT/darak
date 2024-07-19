import PropertiesFilter from "@/components/PropertiesFilter";
import PropertiesList from "@/components/PropertiesList";
import { getProperties } from "@/lib/services";
import { Suspense } from "react";

async function properties() {
  const properties = getProperties();
  return (
    <div className=" my-[3.5rem] relative">
      <div className="container flex gap-8 lg:flex-nowrap flex-wrap max-lg:justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <PropertiesFilter />
        </Suspense>
        <Suspense key={crypto.randomUUID()} fallback={<div>Loading...</div>}>
          <PropertiesList properties={properties} />
        </Suspense>
      </div>
    </div>
  );
}

export default properties;
