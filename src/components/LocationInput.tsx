"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import data from "../../data/countries.json";

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
import { Check } from "lucide-react";
import { useTranslation } from "@/context/TranslationProvider";
import useLocale from "@/hooks/useLocale";

function LocationInput({
  className,
  currentLocation,
  handleLocation,
}: {
  className?: string;
  currentLocation: string;
  handleLocation: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const { dictionary } = useTranslation();
  const { locale } = useLocale();

  const locations: {
    id: string;
    governorate_id: string;
    city_name_ar: string;
    city_name_en: string;
  }[] = data;

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
          {currentLocation || dictionary.filter.home.location.placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={dictionary.filter.home.location.placeholder}
          />
          <CommandEmpty>No locations found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {locations.map((location) => {
                const cityName =
                  locale === "ar"
                    ? location.city_name_ar
                    : location.city_name_en;
                return (
                  <CommandItem
                    key={location.id}
                    value={location.city_name_en}
                    className={`text-black aria-selected:bg-bgDarker ${
                      currentLocation === location.city_name_en
                        ? "bg-gray-200"
                        : ""
                    }`}
                    onSelect={(selectedCity) => {
                      handleLocation(
                        selectedCity === currentLocation ? "" : selectedCity,
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
                    {cityName}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default LocationInput;
