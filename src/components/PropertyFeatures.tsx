import { IProperty } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { BiArea } from "react-icons/bi";
import { PiBathtub, PiBedLight } from "react-icons/pi";

function PropertyFeatures({
  property,
  featureStyle,
}: {
  property: IProperty;
  featureStyle?: string;
}) {
  return (
    <div className="flex  text-font items-center text-xs sm:text-sm justify-between w-full flex-wrap gap-2 ">
      <Feature featureStyle={featureStyle}>
        <PiBedLight className="size-5" />
        {property.rooms} Rooms
      </Feature>

      <span className="min-h-full self-stretch w-[1px] block bg-stroke"></span>

      <Feature featureStyle={featureStyle}>
        <PiBathtub className="size-5" />
        {property.bathrooms} Bathrooms
      </Feature>

      <span className="min-h-full self-stretch w-[1px] block bg-stroke"></span>

      <Feature featureStyle={featureStyle}>
        <BiArea className="size-5" />
        {property.space} Sqft
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
    <p
      className={cn(
        "text-center  flex-col  flex-nowrap line-clamp-1 items-center gap-1 flex ",
        featureStyle
      )}
    >
      {children}
    </p>
  );
}

export default PropertyFeatures;
