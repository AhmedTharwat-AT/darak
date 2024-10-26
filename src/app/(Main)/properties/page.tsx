import PropertiesFilter from "@/features/properties/components/PropertiesFilter";
import PropertiesWrapper from "@/features/properties/components/PropertiesWrapper";
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
