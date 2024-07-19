import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterContext } from "@/context/FilterContext";

function PropertyTypeMenu({
  className,
  icon = true,
}: {
  icon?: boolean;
  className: string;
}) {
  const { propertyType, handlePropertyType } = useFilterContext();
  const types = ["all", "apartment", "building", "store"];

  return (
    <Select onValueChange={handlePropertyType} value={propertyType}>
      <SelectTrigger
        icon={icon}
        className={`bg-none border-none capitalize ${className}`}
      >
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent side="bottom">
        {types.map((type) => (
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
