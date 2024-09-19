import { getProperties } from "@/lib/services";
import PropertyItem from "./PropertyItem";

async function PropertiesList({
  page,
  sortBy,
}: {
  page: string;
  sortBy: string;
}) {
  const properties = await getProperties(page ? Number(page) : 1);

  // const properties = await nextCache(
  //   async (page) => getProperties(page ? Number(page) : 1),
  //   ["properties", page],
  //   { revalidate: 15, tags: ["properties"] }
  // )(page);

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
