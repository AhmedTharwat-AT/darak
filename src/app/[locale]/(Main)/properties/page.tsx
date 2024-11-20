import PropertiesFilter from "@/features/properties/components/PropertiesFilter";
import PropertiesWrapper from "@/features/properties/components/PropertiesWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import FilterProvider from "@/context/FilterContext";

import { Suspense } from "react";
import { IFilterValues } from "@/lib/types";

async function properties(props: {
  searchParams: Promise<{
    page: string;
    sortBy: string;
    filterValues: IFilterValues;
  }>;
}) {
  const searchParams = await props.searchParams;

  const { page = "1", sortBy, ...filterValues } = searchParams;

  return (
    <div className="relative my-5 lg:my-14">
      <div className="container flex h-full flex-wrap gap-4 max-md:justify-center md:flex-nowrap">
        {/* desktop filter */}
        <Suspense
          fallback={
            <Skeleton className="top-4 hidden h-screen max-h-[870px] w-full shrink-0 overflow-y-auto rounded-lg bg-gray-300 p-6 shadow-md md:sticky md:block md:max-w-80" />
          }
        >
          <div className="min-h-full">
            <FilterProvider>
              <PropertiesFilter className="top-0 hidden shadow-md md:block md:max-w-80" />
            </FilterProvider>
          </div>
        </Suspense>

        <PropertiesWrapper
          page={page}
          sortBy={sortBy}
          filterValues={filterValues as IFilterValues}
        />
      </div>
    </div>
  );
}

export default properties;
