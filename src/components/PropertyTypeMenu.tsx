"use client";

import { useTranslation } from "@/context/TranslationProvider";
import { cn } from "@/lib/utils";
import { PropertyTypes } from "@/lib/types";
import { PROPERTY_TYPES } from "@/lib/constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function PropertyTypeMenu({
  className,
  icon = true,
  propertyType,
  handlePropertyType,
  types = PROPERTY_TYPES,
}: {
  icon?: boolean;
  className?: string;
  propertyType: PropertyTypes;
  handlePropertyType: (type: PropertyTypes) => void;
  types?: PropertyTypes[];
}) {
  const { dictionary } = useTranslation();

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
            className="text-start capitalize data-[highlighted]:bg-bgDarker"
            key={type}
            value={type}
          >
            {dictionary.filter.type[type]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default PropertyTypeMenu;
