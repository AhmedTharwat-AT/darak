"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

function useFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [propertyType, setPropertyType] = useState<"rent" | "sell">(
    (searchParams.get("type") as "rent" | "sell") || "rent"
  );
  const [rooms, setRooms] = useState<number>(() =>
    searchParams.get("rooms") ? Number(searchParams.get("rooms")) : 1
  );
  const [bathrooms, setBathrooms] = useState<number>(() =>
    searchParams.get("bathrooms") ? Number(searchParams.get("bathrooms")) : 1
  );
  const [priceRange, setPriceRange] = useState<{ from: number; to: number }>(
    () =>
      searchParams.get("price")
        ? {
            from: Number(searchParams.get("price")?.split("-")[0]),
            to: Number(searchParams.get("price")?.split("-")[1]),
          }
        : {
            from: 100000,
            to: 1000_000,
          }
  );
  const [space, setSpace] = useState<{ from: number; to: number }>(() =>
    searchParams.get("price")
      ? {
          from: Number(searchParams.get("space")?.split("-")[0]),
          to: Number(searchParams.get("space")?.split("-")[1]),
        }
      : {
          from: 50,
          to: 200,
        }
  );
  const [location, setLocation] = useState<string>(() =>
    searchParams.get("location") ? (searchParams.get("location") as string) : ""
  );

  // helper to set search params

  const createAllQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("price", `${priceRange.from}-${priceRange.to}`);
    params.set("space", `${space.from}-${space.to}`);
    params.set("type", propertyType);
    params.set("rooms", String(rooms));
    params.set("bathrooms", String(bathrooms));
    params.set("location", location);

    return params.toString();
  }, [
    searchParams,
    propertyType,
    rooms,
    priceRange,
    space,
    location,
    bathrooms,
  ]);

  function handlePropertyType(type: "rent" | "sell") {
    setPropertyType(type);
  }

  function handleRooms(value: number) {
    if (value < 1) return;
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

  function reset() {
    setPropertyType("rent");
    setRooms(1);
    setBathrooms(1);
    setPriceRange({ from: 100000, to: 1000_000 });
    setSpace({ from: 50, to: 200 });
    setLocation("");
    router.push(pathname, { scroll: false });
  }

  function submitFilter() {
    // create query string for all fitlers
    const queryString = createAllQueryString();
    router.push(pathname + "?" + queryString, { scroll: false });
  }

  return {
    propertyType,
    handlePropertyType,
    rooms,
    handleRooms,
    bathrooms,
    handleBathrooms,
    priceRange,
    handlePriceRange,
    location,
    space,
    handleSpaceRange,
    submitFilter,
    reset,
  };
}

export default useFilter;
