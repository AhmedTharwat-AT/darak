"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import useLocale from "./useLocale";
import { PropertyTypes } from "@/lib/types";

export type PropertyMode = "rent" | "sell";

function useFilter() {
  const router = useRouter();
  const { pathWithlocale, locale } = useLocale();
  const searchParams = useSearchParams();

  const [propertyMode, setPropertyMode] = useState<PropertyMode>(
    (searchParams.get("mode") as PropertyMode) || "rent",
  );
  const [propertyType, setPropertyType] = useState<PropertyTypes>(
    (searchParams.get("type") as PropertyTypes) || "all",
  );
  const [rooms, setRooms] = useState<number>(() =>
    searchParams.get("rooms") ? Number(searchParams.get("rooms")) : 1,
  );
  const [bathrooms, setBathrooms] = useState<number>(() =>
    searchParams.get("bathrooms") ? Number(searchParams.get("bathrooms")) : 1,
  );
  const [location, setLocation] = useState<string>(() =>
    searchParams.get("location")
      ? (searchParams.get("location") as string)
      : "",
  );
  const [priceRange, setPriceRange] = useState<{ from: number; to: number }>(
    () =>
      searchParams.get("price")
        ? {
            from: Number(searchParams.get("price")?.split("-")[0]),
            to: Number(searchParams.get("price")?.split("-")[1]),
          }
        : {
            from: 100_000,
            to: 10_000_000,
          },
  );
  const [space, setSpace] = useState<{ from: number; to: number }>(() =>
    searchParams.get("price")
      ? {
          from: Number(searchParams.get("space")?.split("-")[0]),
          to: Number(searchParams.get("space")?.split("-")[1]),
        }
      : {
          from: 10,
          to: 2000,
        },
  );

  // helper to set search params

  const createAllQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("price", `${priceRange.from}-${priceRange.to}`);
    params.set("space", `${space.from}-${space.to}`);
    params.set("type", propertyType);
    params.set("mode", propertyMode);
    params.set("rooms", String(rooms));
    params.set("bathrooms", String(bathrooms));
    params.set("location", location);
    params.set("page", "1");

    return params.toString();
  }, [
    searchParams,
    propertyType,
    rooms,
    priceRange,
    space,
    location,
    bathrooms,
    propertyMode,
  ]);

  function handlePropertyType(type: PropertyTypes) {
    setPropertyType(type);
  }

  function handlePropertyMode(mode: PropertyMode) {
    setPropertyMode(mode);
  }

  function handleRooms(value: number) {
    if (value < 0) return;
    setRooms(value);
  }

  function handleBathrooms(value: number) {
    if (value < 0) return;
    setBathrooms(value);
  }

  function handlePriceRange({ from, to }: { from: number; to: number }) {
    if (from < 0) from = 0;
    if (to < 0) to = from + 5;
    setPriceRange({ from, to });
  }

  function handleSpaceRange({ from, to }: { from: number; to: number }) {
    setSpace({ from, to });
  }

  function handleLocation(value: string) {
    setLocation(value);
  }

  function reset() {
    setPropertyType("all");
    setPropertyMode("rent");
    setRooms(1);
    setBathrooms(1);
    setPriceRange({ from: 100000, to: 1000_000 });
    setSpace({ from: 50, to: 200 });
    setLocation("");
    router.push(pathWithlocale, { scroll: false });
  }

  function submitFilter() {
    // create query string for all fitlers
    const queryString = createAllQueryString();
    router.push(`/${locale}/properties?` + queryString, { scroll: false });
  }

  return {
    propertyType,
    propertyMode,
    rooms,
    bathrooms,
    priceRange,
    location,
    space,
    handlePropertyType,
    handlePropertyMode,
    handleRooms,
    handleBathrooms,
    handlePriceRange,
    handleSpaceRange,
    handleLocation,
    submitFilter,
    reset,
  };
}

export default useFilter;
