"use client";

import { Button } from "./ui/button";
import Image from "next/image";
import PropertyTypeMenu from "./PropertyTypeMenu";

import { useFilterContext } from "@/context/FilterContext";
import LocationInput from "./LocationInput";

function HomeFilter() {
  const { propertyMode, handlePropertyMode, submitFilter } = useFilterContext();

  return (
    <div className="font-poppins mt-14 grid max-md:justify-center">
      <div className="text-black">
        <Button
          className={`text-black py-4 rounded-bl-none disabled:opacity-100 rounded-br-none uppercase ${
            propertyMode === "rent" ? "bg-white" : "bg-grayLight"
          }`}
          disabled={propertyMode === "rent"}
          onClick={() => handlePropertyMode("rent")}
        >
          for rent
        </Button>
        <Button
          className={`text-black py-4 rounded-bl-none disabled:opacity-100 rounded-br-none uppercase ${
            propertyMode === "sell" ? "bg-white" : "bg-grayLight"
          }`}
          disabled={propertyMode === "sell"}
          onClick={() => handlePropertyMode("sell")}
        >
          for sell
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-lg rounded-tl-none flex max-md:flex-col p-4 md:p-6 gap-4 lg:gap-6 items-center justify-between max-md:justify-center w-fit md:w-full">
        <div className="flex flex-col w-full max-w-80 h-24 p-4 justify-between bg-bgLight rounded-md border border-grayLight">
          <h3 className="text-font text-sm lg:text-base uppercase">location</h3>
          <div className="flex justify-between items-center ">
            <LocationInput
              icon={false}
              className="capitalize text-base lg:text-xl p-0 bg-none appearance-none h-auto border-none"
            />

            <Image
              src={"/assets/icons/location.svg"}
              alt="search"
              width={24}
              height={24}
            />
          </div>
        </div>

        <div className="flex flex-col w-full max-w-80 h-24 p-4 justify-between bg-bgLight rounded-md border border-grayLight">
          <h3 className="text-font text-sm lg:text-base uppercase">
            property type
          </h3>
          <div className="flex justify-between items-center ">
            <PropertyTypeMenu
              icon={false}
              className="capitalize text-base lg:text-xl p-0 bg-none appearance-none h-auto"
            />

            <Image
              src={"/assets/icons/house.svg"}
              alt="search"
              width={24}
              height={24}
            />
          </div>
        </div>

        <div className="flex flex-col w-full max-w-80 h-24 p-4 justify-between bg-bgLight rounded-md border border-grayLight">
          <h3 className="text-font text-sm lg:text-base uppercase">price</h3>
          <div className="flex justify-between items-center ">
            <p className="capitalize text-base lg:text-xl">
              egp 500,000 - 3,000,000
            </p>
            <Image
              src={"/assets/icons/house.svg"}
              alt="search"
              width={24}
              height={24}
            />
          </div>
        </div>
        <Button
          onClick={submitFilter}
          variant={"link"}
          className="bg-alt shrink-0 w-full rounded-full h-12 md:w-12 aspect-square p-3 border-none"
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
