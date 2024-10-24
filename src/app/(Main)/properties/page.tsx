import PropertiesFilter from "@/components/PropertiesFilter";
import PropertiesWrapper from "@/components/PropertiesWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import FilterProvider from "@/context/FilterContext";

import { Suspense } from "react";

export type IFilterValues = {
  price?: string;
  space?: string;
  mode?: string;
  type?: string;
  rooms?: string;
  bathrooms?: string;
  location?: string;
};

function properties({
  searchParams: { page = "1", sortBy, ...filterValues },
}: {
  searchParams: { page: string; sortBy: string; filterValues: IFilterValues };
}) {
  return (
    <div className=" my-[3.5rem] relative">
      <div className="container flex gap-4 md:flex-nowrap flex-wrap max-md:justify-center">
        {/* desktop filter */}
        <Suspense
          fallback={
            <Skeleton className="md:block hidden md:max-w-80 shadow-md w-full  bg-gray-300 p-6 rounded-lg max-h-[870px] h-screen md:sticky top-4 overflow-y-auto shrink-0" />
          }
        >
          <FilterProvider>
            <PropertiesFilter className="md:block hidden md:max-w-80 shadow-md" />
          </FilterProvider>
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
