"use client";

import { useSearchParams } from "next/navigation";
import { use } from "react";
import type { getProperties } from "@/lib/services";

import SortBy from "./SortBy";
import Link from "next/link";
import PropertyItem from "./PropertyItem";

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
      <div className="mb-4">
        <SortBy />
      </div>
      <div className="">
        <ul className="grid md:grid-cols-1 sm:grid-cols-2 grid-cols-1 lg:grid-cols-2  gap-4 2xl:grid-cols-3">
          {filteredProperties?.map((property) => (
            <PropertyItem key={property.id} property={property} />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default PropertiesList;
