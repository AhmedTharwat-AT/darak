"use client";

import { useSearchParams } from "next/navigation";
import { use } from "react";
import type { getProperties } from "@/lib/services";

import SortBy from "./SortBy";
import PropertyItem from "./PropertyItem";
import MobileFilter from "./MobileFilter";

function PropertiesList({
  properties,
}: {
  properties: ReturnType<typeof getProperties>;
}) {
  const awaitedProperties = use(properties);
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  let filteredProperties;

  if (!awaitedProperties || awaitedProperties.length === 0)
    return <div>no properties to load</div>;

  if (!sortBy || sortBy === "default") filteredProperties = awaitedProperties;
  if (sortBy === "htlprice")
    filteredProperties = awaitedProperties.sort((a, b) => b.price - a.price);
  if (sortBy === "lthprice")
    filteredProperties = awaitedProperties.sort((a, b) => a.price - b.price);
  if (sortBy === "htlspace")
    filteredProperties = awaitedProperties.sort((a, b) => b.space - a.space);
  if (sortBy === "lthspace")
    filteredProperties = awaitedProperties.sort((a, b) => a.space - b.space);

  return (
    <main>
      <div className="mb-4 flex justify-end gap-4">
        <SortBy />
        {/*filter for mobile view */}
        <MobileFilter />
      </div>
      <div className="">
        <ul className="grid grid-cols-1 lg:grid-cols-2  gap-3 4xl:grid-cols-3">
          {filteredProperties?.map((property) => (
            <PropertyItem key={property.id} property={property} />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default PropertiesList;
