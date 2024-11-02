import { useState, useTransition } from "react";
import { useFilterContext } from "@/context/FilterContext";
import data from "../../data/countries.json";
import { cn } from "@/lib/utils";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function LocationInput({
  className,
  icon = true,
}: {
  className?: string;
  icon?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [_, startTransition] = useTransition();
  const { location: currentLocation, handleLocation } = useFilterContext();

  const locations: {
    id: string;
    governorate_id: string;
    city_name_ar: string;
    city_name_en: string;
  }[] = data;

  function handleOpenComboBox() {
    startTransition(() => {
      setOpen((o) => !o);
    });
  }

  return (
    <Popover open={open} onOpenChange={handleOpenComboBox}>
      <PopoverTrigger asChild>
        <Button
          id="location"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[200px] justify-between focus:outline-none focus:ring-0 focus-visible:ring-0",
            className,
          )}
        >
          {currentLocation || "Select location..."}
          {icon && (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search locations..." />
          <CommandEmpty>No locations found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.id}
                  value={location.city_name_en}
                  className={`"text-black aria-selected:bg-bgDarker ${
                    currentLocation === location.city_name_en
                      ? "bg-red-800"
                      : ""
                  }"`}
                  onSelect={(currentValue) => {
                    handleLocation(
                      currentValue === currentLocation ? "" : currentValue,
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentLocation === location.city_name_en
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {location.city_name_en}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default LocationInput;
