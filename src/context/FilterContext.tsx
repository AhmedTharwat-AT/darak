"use client";

import { createContext, useContext } from "react";
import useFilter, { PropertyMode, PropertyType } from "@/hooks/useFilter";

const initialState = {
  propertyType: "all",
  propertyMode: "rent",
  rooms: 1,
  bathrooms: 1,
  priceRange: { from: 100000, to: 1000000 },
  space: { from: 50, to: 200 },
  location: "",
  submitFilter: () => {},
  reset: () => {},
  handlePropertyType: (type: PropertyType) => {},
  handlePropertyMode: (mode: PropertyMode) => {},
  handleRooms: (value: number) => {},
  handleBathrooms: (value: number) => {},
  handleLocation: (value: string) => {},
  handlePriceRange: ({ from, to }: { from: number; to: number }) => {},
  handleSpaceRange: ({ from, to }: { from: number; to: number }) => {},
};

const FilterContext = createContext<ReturnType<typeof useFilter>>(
  initialState as ReturnType<typeof useFilter>
);

function FilterProvider({ children }: { children: React.ReactNode }) {
  const filter = useFilter();
  return (
    <FilterContext.Provider value={{ ...filter }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  return useContext(FilterContext);
}

export default FilterProvider;
