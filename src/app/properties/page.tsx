import { getProperties } from "@/lib/services";
import { Suspense } from "react";

import PropertiesFilter from "@/components/PropertiesFilter";
import PropertiesList from "@/components/PropertiesList";

async function properties({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) {
  const properties = getProperties(page ? Number(page) : 1);

  return (
    <div className=" my-[3.5rem] relative">
      <div className="container flex gap-4 md:flex-nowrap flex-wrap max-md:justify-center">
        <PropertiesFilter className="md:block hidden md:max-w-80 shadow-md" />

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
