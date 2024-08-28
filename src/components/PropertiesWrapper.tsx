import { getProperties, getPropertiesCount } from "@/lib/services";

import { Suspense } from "react";

import Paginate from "./Paginate";
import SortBy from "./SortBy";
import MobileFilter from "./MobileFilter";
import PropertiesList from "./PropertiesList";

async function PropertiesWrapper({
  page,
  sortBy,
}: {
  page: string;
  sortBy: string;
}) {
  const propertiesCount = await getPropertiesCount();

  return (
    <section className="flex flex-col w-full">
      <div className="mb-4 flex lg:justify-between justify-end gap-4">
        <SortBy />
        <Suspense fallback={null}>
          <Paginate
            propertiesCount={propertiesCount}
            className="lg:flex hidden"
          />
        </Suspense>
        {/* mobile filter */}
        <MobileFilter />
      </div>

      <Suspense key={crypto.randomUUID()} fallback={<div>Loading list...</div>}>
        <PropertiesList
          page={page}
          sortBy={sortBy}
          propertiesCount={propertiesCount}
        />
      </Suspense>

      {/* mobile pagination */}
      <Suspense fallback={null}>
        <Paginate
          propertiesCount={propertiesCount}
          className="justify-center mt-auto pt-8 lg:hidden flex"
        />
      </Suspense>
    </section>
  );
}

export default PropertiesWrapper;
