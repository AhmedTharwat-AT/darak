import { auth } from "@/auth";
import { getFilteredProperties, getUser } from "@/services/prismaApi";
import { getDictionary } from "@/app/[locale]/dictionaries";
import {
  IFilterValues,
  PropertyWithImages,
  UserWithProperties,
} from "@/lib/types";

import PropertyItem from "./PropertyItem";
import ErrorMessage from "@/components/ErrorMessage";

async function PropertiesList({
  page,
  sortBy,
  filterValues,
  locale,
}: {
  page: string;
  sortBy: string;
  filterValues: IFilterValues;
  locale: string;
}) {
  const properties: PropertyWithImages[] | null = await getFilteredProperties({
    page: page ? Number(page) : 1,
    ...filterValues,
  });

  if (!properties || properties.length === 0)
    return <ErrorMessage message="no properties to load" />;

  const session = await auth();
  let user: UserWithProperties;
  if (session?.user) {
    user = await getUser(session.user.email);
  }

  const dictionary = await getDictionary(locale);

  let filteredProperties;

  switch (sortBy) {
    case "htlprice":
      filteredProperties = properties.sort(
        (a: { price: number }, b: { price: number }) => b.price - a.price,
      );
      break;
    case "lthprice":
      filteredProperties = properties.sort(
        (a: { price: number }, b: { price: number }) => a.price - b.price,
      );
      break;
    case "htlspace":
      filteredProperties = properties.sort(
        (a: { space: number }, b: { space: number }) => b.space - a.space,
      );
      break;
    case "lthspace":
      filteredProperties = properties.sort(
        (a: { space: number }, b: { space: number }) => a.space - b.space,
      );
      break;
    default:
      filteredProperties = properties;
      break;
  }

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
              key={property.id}
              property={property}
              isBookmarked={isBookmarked}
              dictionary={dictionary}
              locale={locale}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default PropertiesList;
