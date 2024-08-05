"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/lib/constants";

import { Button } from "./ui/button";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { cn } from "@/lib/utils";

function Paginate({
  propertiesCount,
  className,
}: {
  propertiesCount: number;
  className?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currPage = Number(searchParams.get("page")) || 1;
  const pagesCount = Math.ceil(propertiesCount / PAGE_SIZE);
  const hasNext = propertiesCount > currPage * PAGE_SIZE;

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("/properties" + "?" + params.toString());
  }

  return (
    <div className={cn("flex gap-2 flex-wrap ", className)}>
      <Button
        disabled={currPage === 1}
        onClick={() => currPage > 1 && goToPage(currPage - 1)}
        variant={"ghost"}
        className="text-lg px-2"
      >
        <BsChevronDoubleLeft />
      </Button>

      <Button
        variant={currPage === 1 ? "paginationActive" : "pagination"}
        onClick={() => goToPage(1)}
      >
        1
      </Button>

      {currPage >= 3 && <span>...</span>}

      {currPage > 1 && currPage < pagesCount && (
        <Button variant={"paginationActive"}>{currPage}</Button>
      )}

      {currPage + 1 < pagesCount && (
        <Button variant={"pagination"} onClick={() => goToPage(currPage + 1)}>
          {currPage + 1}
        </Button>
      )}

      {currPage + 2 < pagesCount && (
        <Button variant={"pagination"} onClick={() => goToPage(currPage + 2)}>
          {currPage + 2}
        </Button>
      )}

      {currPage <= pagesCount - 3 && <span>...</span>}

      {pagesCount > 1 && (
        <Button
          variant={currPage === pagesCount ? "paginationActive" : "pagination"}
          onClick={() => goToPage(pagesCount)}
        >
          {pagesCount}
        </Button>
      )}

      <Button
        onClick={() => currPage < pagesCount && goToPage(currPage + 1)}
        disabled={!hasNext}
        variant={"ghost"}
        className="text-lg px-2"
      >
        <BsChevronDoubleRight />
      </Button>
    </div>
  );
}

export default Paginate;
