import { getFilteredProperties, getProperties } from "@/lib/services";
import PropertyItem from "./PropertyItem";

async function PropertiesList({
  page,
  sortBy,
  restParams,
}: {
  page: string;
  sortBy: string;
  restParams: any;
}) {
  const properties = await getFilteredProperties({
    page: page ? Number(page) : 1,
    ...restParams,
  });

  let filteredProperties;

  if (!properties || properties.length === 0)
    return <div>no properties to load</div>;

  if (sortBy === "default" || !sortBy) filteredProperties = properties;
  if (sortBy === "htlprice")
    filteredProperties = properties.sort((a, b) => b.price - a.price);
  if (sortBy === "lthprice")
    filteredProperties = properties.sort((a, b) => a.price - b.price);
  if (sortBy === "htlspace")
    filteredProperties = properties.sort((a, b) => b.space - a.space);
  if (sortBy === "lthspace")
    filteredProperties = properties.sort((a, b) => a.space - b.space);

  return (
    // <section className="grid justify-start grid-rows-[auto_1fr]">
    <div className="flex flex-col">
      <ul className="grid grid-cols-1 lg:grid-cols-2  gap-5 4xl:grid-cols-3">
        {filteredProperties?.map((property) => (
          <PropertyItem key={property.id} property={property} />
        ))}
      </ul>
    </div>
  );
}

export default PropertiesList;
