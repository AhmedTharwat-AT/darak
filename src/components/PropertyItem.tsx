import { Property } from "@/lib/types";
import { formatCurrency, relativeDateInDays } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { PiBedLight, PiBathtub } from "react-icons/pi";
import { BiArea } from "react-icons/bi";

type Props = {
  property: Property;
};

function PropertyItem({ property }: Props) {
  return (
    <li
      key={property.id}
      className="border font-poppins  bg-white rounded-lg overflow-hidden"
    >
      <div className="relative">
        <Image
          src={"https://placehold.co/400x400"}
          alt={property.title}
          width={400}
          height={200}
          className="aspect-[1.9] h-[200px] object-cover w-full overflow-hidden"
          unoptimized
        />

        <div className="flex text-white absolute bottom-2 w-full justify-between items-center px-4">
          <p className="font-medium text-sm capitalize">
            {relativeDateInDays(property.createdAt)}
          </p>
          <p className="font-bold">{formatCurrency(property.price)}</p>
        </div>
      </div>

      <div className="p-4">
        <p className="relative before:size-2 before:absolute before:left-0 before:bg-alt before:top-1/2 before:-translate-y-1/2 ps-4 before:rounded-full text-sm text-font capitalize">
          {property.type}
        </p>

        <h2 className="text-xl mt-2 mb-4 line-clamp-1">{property.title}</h2>

        <div className="flex gap-2 items-center">
          <FaLocationDot className="fill-main size-4" />
          <p>{property.location}</p>
        </div>

        {/* seperator */}
        <hr className="bg-stroke my-4" />

        <div className="flex  text-font items-center text-sm justify-between w-full flex-wrap ">
          <p className="text-center flex  flex-nowrap line-clamp-1 items-center gap-2">
            <PiBedLight className="size-5" />
            {property.rooms} Rooms
          </p>
          <p className="text-center flex flex-nowrap line-clamp-1 items-center gap-2">
            <PiBathtub className="size-5" />
            {property.bathrooms} Bathrooms
          </p>
          <p className="text-center  flex flex-nowrap line-clamp-1 items-center gap-2">
            <BiArea className="size-5" />
            {property.space} Sqft
          </p>
        </div>
      </div>
    </li>
  );
}

export default PropertyItem;
