import { Property } from "@prisma/client";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { BiArea } from "react-icons/bi";
import { PiBathtub, PiBedLight } from "react-icons/pi";

function PropertyFeatures({
  property,
  featureStyle,
  className,
}: {
  property: Property;
  featureStyle?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center justify-between gap-2 text-xs text-font sm:text-sm",
        className,
      )}
    >
      <Feature featureStyle={featureStyle}>
        <PiBedLight className="size-5" />
        {property.rooms} Rooms
      </Feature>

      <span className="block min-h-full w-[1px] self-stretch bg-stroke"></span>

      <Feature featureStyle={featureStyle}>
        <PiBathtub className="size-5" />
        {property.bathrooms} Bathrooms
      </Feature>

      <span className="block min-h-full w-[1px] self-stretch bg-stroke"></span>

      <Feature featureStyle={featureStyle}>
        <BiArea className="size-5" />
        <p className="flex gap-1">
          <span>{property.space}</span>
          <span>
            m<sup>2</sup>
          </span>
        </p>
      </Feature>
    </div>
  );
}

function Feature({
  children,
  featureStyle,
}: {
  children: ReactNode;
  featureStyle?: string;
}) {
  return (
    <div
      className={cn(
        "line-clamp-1 flex flex-col flex-nowrap items-center gap-1 text-center",
        featureStyle,
      )}
    >
      {children}
    </div>
  );
}

export default PropertyFeatures;
