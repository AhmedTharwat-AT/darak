import { getFilteredProperties, getUser } from "@/services/prismaApi";
import { auth } from "@/auth";
import { PropertyWithImages, UserWithProperties } from "@/lib/types";

import PropertyItem from "./PropertyItem";
import Error from "@/components/Error";

async function PropertiesList({
  page,
  sortBy,
  filterValues,
}: {
  page: string;
  sortBy: string;
  filterValues: any;
}) {
  const session = await auth();
  let user: UserWithProperties;
  if (session?.user) {
    user = await getUser(session.user.email);
  }

  const properties: PropertyWithImages[] | null = await getFilteredProperties({
    page: page ? Number(page) : 1,
    ...filterValues,
  });

  let filteredProperties;

  if (!properties || properties.length === 0)
    return <Error message="no properties to load" />;

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
    <div className="flex flex-col">
      <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2 4xl:grid-cols-3">
        {filteredProperties?.map((property: PropertyWithImages) => {
          let isBookmarked = false;

          if (
            user &&
            user.bookmarked_properties.some((p) => p.propertyId === property.id)
          ) {
            isBookmarked = true;
          }

          return (
            <PropertyItem
              isBookmarked={isBookmarked}
              key={property.id}
              property={property}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default PropertiesList;
