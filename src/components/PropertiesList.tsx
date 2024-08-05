"use client";

import { useSearchParams } from "next/navigation";
import { use } from "react";
import type { getProperties } from "@/lib/services";

import Paginate from "./Paginate";
import SortBy from "./SortBy";
import PropertyItem from "./PropertyItem";
import MobileFilter from "./MobileFilter";

function PropertiesList({
  properties,
  propertiesCount,
}: {
  properties: ReturnType<typeof getProperties>;
  propertiesCount: number | undefined;
}) {
  const awaitedProperties = use(properties);
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  let filteredProperties = awaitedProperties;

  if (
    !propertiesCount ||
    propertiesCount == 0 ||
    !awaitedProperties ||
    awaitedProperties.length === 0
  )
    return <div>no properties to load</div>;

  if (sortBy === "default") filteredProperties = awaitedProperties;
  if (sortBy === "htlprice")
    filteredProperties = awaitedProperties.sort((a, b) => b.price - a.price);
  if (sortBy === "lthprice")
    filteredProperties = awaitedProperties.sort((a, b) => a.price - b.price);
  if (sortBy === "htlspace")
    filteredProperties = awaitedProperties.sort((a, b) => b.space - a.space);
  if (sortBy === "lthspace")
    filteredProperties = awaitedProperties.sort((a, b) => a.space - b.space);

  return (
    // <section className="grid justify-start grid-rows-[auto_1fr]">
    <section className="flex flex-col">
      <div className="mb-4 flex lg:justify-between justify-end gap-4">
        <SortBy />
        <Paginate
          propertiesCount={propertiesCount}
          className="lg:flex hidden"
        />
        <MobileFilter />
      </div>
      <div className="flex flex-col">
        <ul className="grid grid-cols-1 lg:grid-cols-2  gap-5 4xl:grid-cols-3">
          {filteredProperties?.map((property) => (
            <PropertyItem key={property.id} property={property} />
          ))}
        </ul>
      </div>

      <Paginate
        propertiesCount={propertiesCount}
        className="justify-center mt-auto pt-8 lg:hidden flex"
      />
    </section>
  );
}

export default PropertiesList;
