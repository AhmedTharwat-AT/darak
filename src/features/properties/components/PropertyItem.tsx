import AnimatedLink from "@/components/AnimatedLink";
import { PropertyTypes, PropertyWithImages } from "@/lib/types";
import { formatCurrency, relativeDateInDays } from "@/lib/utils";
import Image from "next/image";

import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import BookmarkActionBtn from "./BookmarkActionBtn";
import PropertyFeatures from "./PropertyFeatures";
import { DictionaryType } from "@/app/[locale]/dictionaries";

type Props = {
  property: PropertyWithImages;
  isBookmarked?: boolean;
  dictionary: DictionaryType;
  locale?: string;
};

async function PropertyItem({
  property,
  dictionary,
  isBookmarked = false,
  locale = "en",
}: Props) {
  if (!property || property.status !== "approved") return null;

  return (
    <li
      key={property.id}
      className="relative overflow-hidden rounded-lg border bg-white font-poppins shadow-md"
    >
      <div className="absolute right-2 top-2 z-10">
        <BookmarkActionBtn
          type={isBookmarked ? "remove" : "add"}
          propertyId={property.id}
        />
      </div>

      <AnimatedLink href={`/properties/${property.id}`}>
        <div className="relative">
          <Image
            src={property.images?.[0]?.url || "https://placehold.co/400x400"}
            alt={property.title}
            width={400}
            height={200}
            className="aspect-[1.9] h-[200px] w-full overflow-hidden object-cover brightness-75"
          />

          <div className="absolute bottom-2 flex w-full items-center justify-between px-4 text-white contrast-200 rtl:flex-row-reverse">
            <p className="flex items-center gap-2 text-sm font-semibold capitalize">
              <FaRegClock />
              {relativeDateInDays(property.createdAt, locale)}
            </p>
            <p className="font-bold">
              {formatCurrency(property.price, locale)}
            </p>
          </div>
        </div>

        <div className="p-4">
          <p className="relative ps-4 text-sm capitalize before:absolute before:top-1/2 before:size-2 before:-translate-y-1/2 before:rounded-full before:bg-alt ltr:before:left-0 rtl:text-base rtl:before:right-0">
            {dictionary.filter.type[property.type as PropertyTypes]}
          </p>

          <h2 className="mb-4 mt-2 line-clamp-1 text-xl">{property.title}</h2>

          <div className="flex items-center gap-2">
            <FaLocationDot className="size-4 fill-main" />
            <p>{property.location}</p>
          </div>

          <hr className="my-4 bg-stroke" />

          <PropertyFeatures property={property} dictionary={dictionary} />
        </div>
      </AnimatedLink>
    </li>
  );
}

export default PropertyItem;
