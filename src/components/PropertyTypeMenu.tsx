import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterContext } from "@/context/FilterContext";
import { PROPERTY_TYPES } from "@/lib/constants";

function PropertyTypeMenu({
  className,
  icon = true,
}: {
  icon?: boolean;
  className: string;
}) {
  const { propertyType, handlePropertyType } = useFilterContext();

  return (
    <Select onValueChange={handlePropertyType} value={propertyType}>
      <SelectTrigger
        icon={icon}
        className={`bg-none border-none capitalize ${className}`}
      >
        <SelectValue className="capitalize" placeholder={propertyType} />
      </SelectTrigger>
      <SelectContent side="bottom">
        {PROPERTY_TYPES.map((type) => (
          <SelectItem
            className="data-[highlighted]:bg-bgDarker capitalize "
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
