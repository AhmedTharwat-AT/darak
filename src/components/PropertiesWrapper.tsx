import { Suspense } from "react";

import MobileFilter from "./MobileFilter";
import PaginateWrapper from "./PaginateWrapper";
import PropertiesList from "./PropertiesList";
// import SortBy from "./SortBy";
import { IFilterValues } from "@/app/(Main)/properties/page";
import SortBy from "./SortBy";
import Spinner from "./Spinner";

function PropertiesWrapper({
  page,
  sortBy,
  filterValues,
}: {
  page: string;
  sortBy: string;
  filterValues: IFilterValues;
}) {
  // preload properties count
  // getFilteredPropertiesCount(restParams);

  return (
    <section className="flex flex-col w-full max-w-[450px] lg:max-w-full">
      <div className="mb-4 flex lg:justify-between justify-end gap-4">
        <Suspense fallback={null}>
          <SortBy />
          {/* desktop pagination */}
          <PaginateWrapper
            className="bp:flex hidden"
            filterValues={filterValues}
          />

          {/* mobile filter */}
          <MobileFilter />
        </Suspense>
      </div>

      <Suspense
        key={page}
        fallback={
          <div className="w-full h-full flex justify-center items-center flex-col text-center">
            <Spinner />
            <p>Fetching properties list...</p>
          </div>
        }
      >
        <PropertiesList
          page={page}
          sortBy={sortBy}
          filterValues={filterValues}
        />
      </Suspense>

      {/* mobile pagination */}
      <Suspense fallback={null}>
        <PaginateWrapper
          className="justify-center mt-auto pt-8 bp:hidden flex"
          filterValues={filterValues}
        />
      </Suspense>
    </section>
  );
}

export default PropertiesWrapper;
