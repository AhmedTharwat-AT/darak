import { formatCurrency, relativeDateInDays } from "@/lib/utils";
import Image from "next/image";

import { PropertyWithImages } from "@/lib/types";
import { FaLocationDot } from "react-icons/fa6";
import AnimatedLink from "../../../components/AnimatedLink";
import BookmarkProperty from "./BookmarkProperty";
import PropertyFeatures from "./PropertyFeatures";

type Props = {
  property: PropertyWithImages;
};

function PropertyItem({ property }: Props) {
  return (
    <li
      key={property.id}
      className="overflow-hidden rounded-lg border bg-white font-poppins shadow-md"
    >
      <AnimatedLink href={`/properties/${property.id}`}>
        <div className="relative">
          <Image
            src={property.images[0].url || "https://placehold.co/400x400"}
            alt={property.title}
            width={400}
            height={200}
            className="aspect-[1.9] h-[200px] w-full overflow-hidden object-cover"
          />

          <div className="absolute bottom-2 flex w-full items-center justify-between px-4 text-white">
            <p className="text-sm font-medium capitalize">
              {relativeDateInDays(property.createdAt)}
            </p>
            <p className="font-stroke font-bold">
              {formatCurrency(property.price)}
            </p>
          </div>

          <div className="absolute right-1 top-1">
            <BookmarkProperty
              propertyId={property.id}
              className="scale-[0.85]"
            />
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
