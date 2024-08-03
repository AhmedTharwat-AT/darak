import { Property } from "@/lib/types";
import { formatCurrency, relativeDateInDays } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  property: Property;
};

function PropertyItem({ property }: Props) {
  return (
    <li
      key={property.id}
      className="border font-poppins h-[400px] rounded-lg overflow-hidden"
    >
      <div className="relative">
        <Image
          src={"https://placehold.co/400x400"}
          alt={property.title}
          width={400}
          height={200}
          className="aspect-[1.9] h-[200px] object-cover overflow-hidden"
          unoptimized
        />
        <div className="flex text-white -mt-8 mb-4 justify-between items-center px-4">
          <p className="font-medium text-sm">
            {relativeDateInDays(property.createdAt)}
          </p>
          <p className="font-bold">{formatCurrency(property.price)}</p>
        </div>
      </div>
      <div className="p-2">
        <p>{property.type}</p>
        <p>{property.description}</p>
        <p>{property.space}</p>
        <p>{property.location}</p>
        <p>{property.price}</p>
        <Link href={`/properties/${property.id}`}>{property.title}</Link>
      </div>
    </li>
  );
}

export default PropertyItem;
