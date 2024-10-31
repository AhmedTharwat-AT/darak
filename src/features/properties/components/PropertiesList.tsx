import { getFilteredProperties } from "@/services/prismaApi";

import PropertyItem from "./PropertyItem";
import { PropertyWithImages } from "@/lib/types";

async function PropertiesList({
  page,
  sortBy,
  filterValues,
}: {
  page: string;
  sortBy: string;
  filterValues: any;
}) {
  const properties = await getFilteredProperties({
    page: page ? Number(page) : 1,
    ...filterValues,
  });

  let filteredProperties;

  if (!properties || properties.length === 0)
    return <div>no properties to load</div>;

  if (sortBy === "default" || !sortBy) filteredProperties = properties;
  if (sortBy === "htlprice")
    filteredProperties = properties.sort(
      (a: { price: number }, b: { price: number }) => b.price - a.price,
    );
  if (sortBy === "lthprice")
    filteredProperties = properties.sort(
      (a: { price: number }, b: { price: number }) => a.price - b.price,
    );
  if (sortBy === "htlspace")
    filteredProperties = properties.sort(
      (a: { space: number }, b: { space: number }) => b.space - a.space,
    );
  if (sortBy === "lthspace")
    filteredProperties = properties.sort(
      (a: { space: number }, b: { space: number }) => a.space - b.space,
    );

  return (
    // <section className="grid justify-start grid-rows-[auto_1fr]">
    <div className="flex flex-col">
      <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2 4xl:grid-cols-3">
        {filteredProperties?.map((property: PropertyWithImages) => (
          <PropertyItem key={property.id} property={property} />
        ))}
      </ul>
    </div>
  );
}

export default PropertiesList;
