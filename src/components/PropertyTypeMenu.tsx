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

  return (
    <Select onValueChange={handlePropertyType} value={propertyType}>
      <SelectTrigger icon={icon} className={`bg-none border-none ${className}`}>
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent side="bottom">
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="apartment">Apartment</SelectItem>
        <SelectItem value="building">Building</SelectItem>
        <SelectItem value="store">Store</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default PropertyTypeMenu;
