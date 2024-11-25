"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/lib/constants";

import { Button } from "./ui/button";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

function Paginate({
  propertiesCount = 0,
  className,
}: {
  propertiesCount: number;
  className?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currPage = Number(searchParams.get("page")) || 1;
  const pagesCount = Math.ceil(propertiesCount / PAGE_SIZE);
  const hasNext = currPage < pagesCount;

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("/properties" + "?" + params.toString());
  }

  return (
    <div className={cn("flex flex-wrap gap-2 rtl:flex-row-reverse", className)}>
      <Button
        disabled={currPage === 1}
        onClick={() => currPage > 1 && goToPage(currPage - 1)}
        variant={"ghost"}
        className="px-2 text-lg"
      >
        <BsChevronDoubleLeft />
      </Button>

      <Button
        disabled={currPage === 1}
        variant={currPage === 1 ? "paginationActive" : "pagination"}
        onClick={() => goToPage(1)}
      >
        1
      </Button>

      {currPage >= 4 && pagesCount > 4 && <span>...</span>}

      {currPage == pagesCount && pagesCount >= 4 && (
        <Button variant={"pagination"} onClick={() => goToPage(currPage - 2)}>
          {currPage - 2}
        </Button>
      )}

      {currPage >= 3 && currPage <= pagesCount && (
        <Button variant={"pagination"} onClick={() => goToPage(currPage - 1)}>
          {currPage - 1}
        </Button>
      )}

      {currPage > 1 && currPage < pagesCount && (
        <Button
          disabled
          variant={"paginationActive"}
          onClick={() => goToPage(currPage)}
        >
          {currPage}
        </Button>
      )}

      {currPage + 1 < pagesCount && (
        <Button variant={"pagination"} onClick={() => goToPage(currPage + 1)}>
          {currPage + 1}
        </Button>
      )}

      {currPage + 2 < pagesCount && pagesCount <= 4 && (
        <Button variant={"pagination"} onClick={() => goToPage(currPage + 2)}>
          {currPage + 2}
        </Button>
      )}

      {currPage <= pagesCount - 3 && pagesCount > 4 && <span>...</span>}

      {pagesCount > 1 && (
        <Button
          disabled={currPage === pagesCount}
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
        className="px-2 text-lg"
      >
        <BsChevronDoubleRight />
      </Button>
    </div>
  );
}

export default Paginate;
