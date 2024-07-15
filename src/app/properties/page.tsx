import PropertiesFilter from "@/components/PropertiesFilter";
import PropertiesList from "@/components/PropertiesList";
import { getProperties } from "@/lib/services";
import { Suspense } from "react";

async function properties() {
  const properties = await getProperties();
  return (
    <div className=" my-[3.5rem]">
      <div className="container flex gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          <PropertiesFilter />
          <PropertiesList properties={properties} />
        </Suspense>
      </div>
    </div>
  );
}

export default properties;
