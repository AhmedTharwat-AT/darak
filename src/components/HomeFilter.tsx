"use client";

import { Button } from "./ui/button";
import Image from "next/image";
import PropertyTypeMenu from "./PropertyTypeMenu";

import { useFilterContext } from "@/context/FilterContext";
import LocationInput from "./LocationInput";
import Slider from "./Slider";
import { formatCurrency } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

function HomeFilter() {
  const {
    propertyMode,
    handlePropertyMode,
    submitFilter,
    priceRange,
    handlePriceRange,
  } = useFilterContext();

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

          <div className="flex justify-between items-center gap-1 ">
            <LocationInput
              icon={false}
              className="capitalize text-base lg:text-xl p-0 bg-none appearance-none h-auto border-none truncate"
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
              alt="house"
              className="shrink-0 min-w-6"
              width={24}
              height={24}
            />
          </div>
        </div>

        <div className="flex flex-col w-full max-w-80 h-24 p-4 justify-between bg-bgLight rounded-md border border-grayLight">
          <h3 className="text-font text-sm lg:text-base uppercase">price</h3>

          <div className="flex justify-between  items-center gap-x-1 ">
            <Popover>
              <PopoverTrigger>
                <div className="flex gap-x-2  flex-wrap items-center">
                  <p className="capitalize text-sm p-0 bg-none appearance-none h-auto truncate">
                    {formatCurrency(priceRange.from)}
                  </p>
                  <span className="h-[6px] leading-[6px]">&mdash;</span>
                  <p className="capitalize  text-sm p-0 bg-none appearance-none h-auto max-w-[150px] truncate">
                    {formatCurrency(priceRange.to)}
                  </p>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col">
                  <Slider
                    min={10}
                    max={10000000}
                    step={1000}
                    value={priceRange}
                    handler={handlePriceRange}
                  />
                  <button
                    onClick={() => handlePriceRange({ from: 0, to: 1000000 })}
                    className="bg-main text-white rounded-md px-2 py-1 self-center capitalize hover:bg-mainHover transition-all"
                  >
                    reset
                  </button>
                </div>
              </PopoverContent>
            </Popover>
            <Image
              src={"/assets/icons/money.svg"}
              alt="money"
              className="shrink-0 min-w-6"
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
            className="shrink-0 min-w-6"
            width={24}
            height={24}
          />
        </Button>
      </div>
    </div>
  );
}

export default HomeFilter;
