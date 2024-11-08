import AnimatedLink from "@/components/AnimatedLink";
import { PropertyWithImages } from "@/lib/types";
import { formatCurrency, relativeDateInDays } from "@/lib/utils";
import Image from "next/image";

import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import BookmarkActionBtn from "./BookmarkActionBtn";
import PropertyFeatures from "./PropertyFeatures";
import DeletePropertyBtn from "./DeletePropertyBtn";

type Props = {
  property: PropertyWithImages;
  bookmarked?: boolean;
  isOwner?: boolean;
};

function PropertyItem({
  property,
  bookmarked = false,
  isOwner = false,
}: Props) {
  return (
    <li
      key={property.id}
      className="relative overflow-hidden rounded-lg border bg-white font-poppins shadow-md"
    >
      <div className="absolute right-2 top-2 z-10">
        {isOwner ? (
          <DeletePropertyBtn propertyId={property.id} />
        ) : bookmarked ? (
          <BookmarkActionBtn
            type="remove"
            propertyId={property.id}
            className="scale-75"
          />
        ) : (
          <BookmarkActionBtn type="add" propertyId={property.id} />
        )}
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

          <div className="absolute bottom-2 flex w-full items-center justify-between px-4 text-white contrast-200">
            <p className="flex items-center gap-2 text-sm font-semibold capitalize">
              <FaRegClock />
              {relativeDateInDays(property.createdAt)}
            </p>
            <p className="font-bold">{formatCurrency(property.price)}</p>
          </div>
        </div>

        <div className="p-4">
          <p className="relative ps-4 text-sm capitalize text-font before:absolute before:left-0 before:top-1/2 before:size-2 before:-translate-y-1/2 before:rounded-full before:bg-alt">
            {property.type}
          </p>

          <h2 className="mb-4 mt-2 line-clamp-1 text-xl">{property.title}</h2>

          <div className="flex items-center gap-2">
            <FaLocationDot className="size-4 fill-main" />
            <p>{property.location}</p>
          </div>

          {/* seperator */}
          <hr className="my-4 bg-stroke" />

          <PropertyFeatures property={property} />
        </div>
      </AnimatedLink>
    </li>
  );
}

export default PropertyItem;
