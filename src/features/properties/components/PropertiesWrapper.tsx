import { Suspense } from "react";

import MobileFilter from "../../../components/MobileFilter";
import PaginateWrapper from "../../../components/PaginateWrapper";
import PropertiesList from "./PropertiesList";
import { IFilterValues } from "@/app/(Main)/properties/page";
import SortBy from "../../../components/SortBy";
import Spinner from "../../../components/Spinner";

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
    <section className="flex flex-col w-full max-w-[450px] lg:max-w-full">
      <div className="mb-4 flex lg:justify-between justify-end gap-4">
        <SortBy />

        {/* desktop pagination */}
        <Suspense fallback={null}>
          <PaginateWrapper
            className="bp:flex hidden"
            filterValues={filterValues}
          />
        </Suspense>

        <MobileFilter />
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
