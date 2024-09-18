"use client";

import useFilter from "@/hooks/useFilter";
import { createContext, useContext } from "react";

const FilterContext = createContext<ReturnType<typeof useFilter> | null>(null);

function FilterProvider({ children }: { children: React.ReactNode }) {
  const filter = useFilter();
  return (
    <FilterContext.Provider value={{ ...filter }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
}

export default FilterProvider;
