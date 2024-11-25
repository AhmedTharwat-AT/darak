import { Suspense } from "react";

import MobileFilter from "@/components/MobileFilter";
import PaginateWrapper from "@/components/PaginateWrapper";
import PropertiesList from "./PropertiesList";
import SortBy from "@/components/SortBy";
import Spinner from "@/components/Spinner";
import { IFilterValues } from "@/lib/types";

function PropertiesWrapper({
  page,
  sortBy,
  filterValues,
  locale,
}: {
  page: string;
  sortBy: string;
  filterValues: IFilterValues;
  locale: string;
}) {
  return (
    <section className="flex w-full max-w-[450px] flex-col lg:max-w-full">
      <div className="mb-4 flex justify-end gap-4 lg:justify-between">
        <Suspense fallback={null}>
          <SortBy />

          {/* desktop pagination */}
          <PaginateWrapper
            className="hidden bp:flex"
            filterValues={filterValues}
          />

          <MobileFilter />
        </Suspense>
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
          locale={locale}
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
