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
    router.push(`?${params.toString()}`);
  }

  return (
    <Select
      onValueChange={handleSorting}
      value={searchParams.get("sortBy") || "default"}
    >
      <SelectTrigger className="w-fit px-3 py-0   font-semibold font-poppins  focus:ring-0 border-none bg-main text-white gap-2 rounded-lg ring-0 shadow-none appearance-none">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent side="bottom">
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
