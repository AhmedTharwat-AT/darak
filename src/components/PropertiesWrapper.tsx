import { getPropertiesCount } from "@/lib/services";

import { Suspense } from "react";

import MobileFilter from "./MobileFilter";
import Paginate from "./Paginate";
import PropertiesList from "./PropertiesList";
import SortBy from "./SortBy";

async function PropertiesWrapper({
  page,
  sortBy,
}: {
  page: string;
  sortBy: string;
}) {
  const propertiesCount = await getPropertiesCount();

  if (!propertiesCount) return <div>no properties to load</div>;

  return (
    <section className="flex flex-col w-full max-w-[450px] lg:max-w-full">
      <div className="mb-4 flex lg:justify-between justify-end gap-4">
        <SortBy />

        <Paginate
          propertiesCount={propertiesCount}
          className="bp:flex hidden"
        />

        {/* mobile filter */}
        <MobileFilter />
      </div>

      <Suspense
        // key={crypto.randomUUID()}
        fallback={<div>Fetching properties list...</div>}
      >
        <PropertiesList page={page} sortBy={sortBy} />
      </Suspense>

      {/* mobile pagination */}

      <Paginate
        propertiesCount={propertiesCount}
        className="justify-center mt-auto pt-8 bp:hidden flex"
      />
    </section>
  );
}

export default PropertiesWrapper;
