"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyType } from "@/hooks/useFilter";
import { PROPERTY_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";

function PropertyTypeMenu({
  className,
  icon = true,
  propertyType,
  handlePropertyType,
  types = PROPERTY_TYPES,
}: {
  icon?: boolean;
  className?: string;
  propertyType: PropertyType;
  handlePropertyType: (type: PropertyType) => void;
  types?: string[];
}) {
  return (
    <Select onValueChange={handlePropertyType} value={propertyType}>
      <SelectTrigger
        id="property-type-select"
        aria-label="property-type-select"
        icon={icon}
        className={cn(
          "w-full appearance-none rounded-lg bg-white bg-none p-1 ps-2 capitalize shadow-none ring-0 focus:ring-0",
          className,
        )}
      >
        <SelectValue className="capitalize" placeholder={propertyType} />
      </SelectTrigger>
      <SelectContent side="bottom">
        {types.map((type) => (
          <SelectItem
            className="capitalize data-[highlighted]:bg-bgDarker"
            key={type}
            value={type}
          >
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default PropertyTypeMenu;
