"use client";

import { useSearchParams } from "next/navigation";

import { getProperties } from "@/lib/services";

import SortBy from "./SortBy";
import Link from "next/link";
import { use } from "react";

function PropertiesList({
  properties,
}: {
  properties: ReturnType<typeof getProperties>;
}) {
  const searchParams = useSearchParams();
  const awaitedProperties = use(properties);
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
        <ul className="grid grid-cols-1 lg:grid-cols-2  gap-4 2xl:grid-cols-3">
          {filteredProperties?.map((property) => (
            <li key={property.id} className="border p-2 h-[400px] rounded-lg">
              <p>{property.title}</p>
              <p>{property.description}</p>
              <p>{property.space}</p>
              <p>{property.location}</p>
              <p>{property.price}</p>
              <Link href={`/properties/${property.id}`}>{property.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default PropertiesList;
