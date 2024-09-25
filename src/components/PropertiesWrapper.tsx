import { getPropertiesCount } from "@/lib/services";

import { Suspense } from "react";

import MobileFilter from "./MobileFilter";
import PaginateWrapper from "./PaginateWrapper";
import PropertiesList from "./PropertiesList";
import SortBy from "./SortBy";

function PropertiesWrapper({ page, sortBy }: { page: string; sortBy: string }) {
  // preload properties count
  getPropertiesCount();

  return (
    <section className="flex flex-col w-full max-w-[450px] lg:max-w-full">
      <div className="mb-4 flex lg:justify-between justify-end gap-4">
        <SortBy />

        <Suspense
          fallback={
            <div className="lg:flex hidden">Loading paginate top...</div>
          }
        >
          <PaginateWrapper className="bp:flex hidden" />
        </Suspense>

        {/* mobile filter */}
        <MobileFilter />
      </div>

      {/* <PropertiesList properties={properties} sortBy={sortBy} /> */}
      <Suspense key={page} fallback={<div>Fetching properties list...</div>}>
        <PropertiesList page={page} sortBy={sortBy} />
      </Suspense>

      {/* mobile pagination */}
      <Suspense
        fallback={<div className=" bp:hidden ">Loading paginate bottom...</div>}
      >
        <PaginateWrapper className="justify-center mt-auto pt-8 bp:hidden flex" />
      </Suspense>
    </section>
  );
}

export default PropertiesWrapper;
