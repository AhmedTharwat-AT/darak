"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function SortBy() {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSorting(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }

  return (
    <Select
      onValueChange={handleSorting}
      value={searchParams.get("sortBy") || "default"}
      defaultValue="default"
    >
      <SelectTrigger className="w-fit appearance-none gap-2 rounded-lg border-none bg-main px-3 py-0 font-poppins font-semibold text-white shadow-none ring-0 focus:ring-0">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent side="bottom" className="relative z-10">
        <SelectItem value="default">Default</SelectItem>
        <SelectItem value="htlprice">High to Low (price)</SelectItem>
        <SelectItem value="lthprice">Low to High (price)</SelectItem>
        <SelectItem value="htlspace">High to Low (space)</SelectItem>
        <SelectItem value="lthspace">Low to High (space)</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default SortBy;
