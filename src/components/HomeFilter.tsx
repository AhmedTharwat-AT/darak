"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import useFilter from "@/hooks/useFilter";

function HomeFilter() {
  const { propertyType, handlePropertyType } = useFilter();

  return (
    <div className="font-poppins mt-10">
      <div className="text-black">
        <Button
          className={`text-black py-4 rounded-bl-none disabled:opacity-100 rounded-br-none uppercase ${
            propertyType === "rent" ? "bg-white" : "bg-grayLight"
          }`}
          disabled={propertyType === "rent"}
          onClick={() => handlePropertyType("rent")}
        >
          for rent
        </Button>
        <Button
          className={`text-black py-4 rounded-bl-none disabled:opacity-100 rounded-br-none uppercase ${
            propertyType === "sell" ? "bg-white" : "bg-grayLight"
          }`}
          disabled={propertyType === "sell"}
          onClick={() => handlePropertyType("sell")}
        >
          for sell
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-lg rounded-tl-none flex p-6  gap-6 items-center justify-between">
        <div className="flex flex-col w-80 h-24 p-4 justify-between bg-bgLight rounded-md border border-grayLight">
          <h3 className="text-font uppercase">location</h3>
          <div className="flex justify-between items-center ">
            <p className="capitalize text-xl">mansoura, egypt</p>
            <Image
              src={"/assets/icons/location.svg"}
              alt="search"
              width={24}
              height={24}
            />
          </div>
        </div>

        <div className="flex flex-col w-80 h-24 p-4 justify-between bg-bgLight rounded-md border border-grayLight">
          <h3 className="text-font uppercase">property type</h3>
          <div className="flex justify-between items-center ">
            <p className="capitalize text-xl">all</p>
            <Image
              src={"/assets/icons/house.svg"}
              alt="search"
              width={24}
              height={24}
            />
          </div>
        </div>

        <div className="flex flex-col w-80 h-24 p-4 justify-between bg-bgLight rounded-md border border-grayLight">
          <h3 className="text-font uppercase">price</h3>
          <div className="flex justify-between items-center ">
            <p className="capitalize text-xl">egp 500,000 - 3,000,000</p>
            <Image
              src={"/assets/icons/house.svg"}
              alt="search"
              width={24}
              height={24}
            />
          </div>
        </div>
        <Button
          variant={"link"}
          className="bg-alt rounded-full size-12 aspect-square p-3 border-none"
        >
          <Image
            src={"/assets/icons/search.svg"}
            alt="search"
            width={24}
            height={24}
          />
        </Button>
      </div>
    </div>
  );
}

export default HomeFilter;
