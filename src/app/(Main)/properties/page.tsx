import PropertiesFilter from "@/components/PropertiesFilter";
import PropertiesWrapper from "@/components/PropertiesWrapper";
import FilterProvider from "@/context/FilterContext";
import { Suspense } from "react";

async function properties({
  searchParams: { page = "1", sortBy },
}: {
  searchParams: { page: string; sortBy: string };
}) {
  return (
    <div className=" my-[3.5rem] relative">
      <div className="container flex gap-4 md:flex-nowrap flex-wrap max-md:justify-center">
        <FilterProvider>
          <PropertiesFilter className="md:block hidden md:max-w-80 shadow-md" />
        </FilterProvider>

        <Suspense fallback={<div>Loading wrapper...</div>}>
          <PropertiesWrapper page={page} sortBy={sortBy} />
        </Suspense>
      </div>
    </div>
  );
}

export default properties;
