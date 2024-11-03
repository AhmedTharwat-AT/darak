import { Suspense } from "react";

import MobileFilter from "@/components/MobileFilter";
import PaginateWrapper from "@/components/PaginateWrapper";
import PropertiesList from "./PropertiesList";
import { IFilterValues } from "@/app/(Main)/properties/page";
import SortBy from "@/components/SortBy";
import Spinner from "@/components/Spinner";

function PropertiesWrapper({
  page,
  sortBy,
  filterValues,
}: {
  page: string;
  sortBy: string;
  filterValues: IFilterValues;
}) {
  return (
    <section className="flex w-full max-w-[450px] flex-col lg:max-w-full">
      <div className="mb-4 flex justify-end gap-4 lg:justify-between">
        <SortBy />

        {/* desktop pagination */}
        <Suspense fallback={null}>
          <PaginateWrapper
            className="hidden bp:flex"
            filterValues={filterValues}
          />
        </Suspense>

        <MobileFilter />
      </div>

      <Suspense
        key={page}
        fallback={
          <div className="flex h-full w-full flex-col items-center justify-center text-center">
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
          className="mt-auto flex justify-center pt-8 bp:hidden"
          filterValues={filterValues}
        />
      </Suspense>
    </section>
  );
}

export default PropertiesWrapper;
