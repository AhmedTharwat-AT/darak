"use client";

import { useTranslation } from "@/context/TranslationProvider";
import useFilter from "@/hooks/useFilter";
import { formatCurrency } from "@/lib/utils";

import Image from "next/image";
import LocationInput from "./LocationInput";
import PropertyTypeMenu from "./PropertyTypeMenu";
import Slider from "./Slider";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import houseIcon from "@/assets/icons/house.svg";
import locationIcon from "@/assets/icons/location.svg";
import moneyIcon from "@/assets/icons/money.svg";
import searchIcon from "@/assets/icons/search.svg";

function HomeFilter() {
  const {
    propertyMode,
    handlePropertyMode,
    submitFilter,
    priceRange,
    handlePriceRange,
    propertyType,
    handlePropertyType,
    location: currentLocation,
    handleLocation,
  } = useFilter();

  const { dictionary } = useTranslation();

  const { location, mode, price, type } = dictionary.filter;

  return (
    <div className="mt-14 flex w-full font-poppins">
      <div className="w-full max-md:mx-auto max-md:max-w-96">
        <div className="w-fit text-black shadow-2xl">
          <Button
            className={`rounded-bl-none rounded-br-none py-4 uppercase text-black disabled:opacity-100 ${
              propertyMode === "rent" ? "bg-white" : "bg-grayLight"
            }`}
            disabled={propertyMode === "rent"}
            onClick={() => handlePropertyMode("rent")}
          >
            {mode.rent}
          </Button>

          <Button
            className={`rounded-bl-none rounded-br-none py-4 uppercase text-black disabled:opacity-100 ${
              propertyMode === "sell" ? "bg-white" : "bg-grayLight"
            }`}
            disabled={propertyMode === "sell"}
            onClick={() => handlePropertyMode("sell")}
          >
            {mode.sell}
          </Button>
        </div>

        <div className="flex w-full items-center justify-between gap-4 rounded-lg rounded-tl-none bg-white p-4 shadow-md max-md:flex-col max-md:justify-center max-sm:max-w-96 md:p-6 lg:gap-6">
          <div className="flex h-24 w-full max-w-96 flex-col justify-between rounded-md border border-grayLight bg-bgLight p-4 sm:max-w-80">
            <label
              htmlFor="location"
              className="text-sm uppercase text-font lg:text-base"
            >
              {location.label}
            </label>

            <LocationInput
              icon={
                <Image src={locationIcon} alt="search" width={24} height={24} />
              }
              currentLocation={currentLocation}
              handleLocation={handleLocation}
              className="h-auto w-full appearance-none truncate border-none bg-bgLight bg-none p-0 text-base capitalize lg:text-xl"
            />
          </div>

          <div className="flex h-24 w-full max-w-96 flex-col justify-between rounded-md border border-grayLight bg-bgLight p-4 sm:max-w-80">
            <label
              htmlFor="property-type-select"
              className="text-sm uppercase text-font lg:text-base"
            >
              {type.label}
            </label>

            <div className="flex items-center justify-between">
              <PropertyTypeMenu
                propertyType={propertyType}
                handlePropertyType={handlePropertyType}
                downArrow={false}
                icon={
                  <Image
                    src={houseIcon}
                    alt="house"
                    className="min-w-6 shrink-0"
                    width={24}
                    height={24}
                  />
                }
                className="flex h-auto appearance-none items-center justify-between border-none bg-bgLight bg-none p-0 text-base capitalize lg:text-xl rtl:flex-row-reverse"
              />
            </div>
          </div>

          <div className="flex h-24 w-full max-w-96 flex-col justify-between rounded-md border border-grayLight bg-bgLight p-4 sm:max-w-80">
            <label
              htmlFor="price"
              className="text-sm uppercase text-font lg:text-base"
            >
              {price}
            </label>

            <div className="flex items-center justify-between gap-x-1">
              <Popover>
                <PopoverTrigger id="price">
                  <div className="flex flex-wrap items-center gap-x-2">
                    <p className="h-auto appearance-none truncate bg-none p-0 text-sm capitalize">
                      {formatCurrency(priceRange.from)}
                    </p>

                    <span className="h-[6px] leading-[6px]">&mdash;</span>

                    <p className="h-auto max-w-[150px] appearance-none truncate bg-none p-0 text-sm capitalize">
                      {formatCurrency(priceRange.to)}
                    </p>
                  </div>
                </PopoverTrigger>

                <PopoverContent>
                  <div className="flex flex-col">
                    <Slider
                      min={10}
                      max={100_000_000}
                      step={1000}
                      value={priceRange}
                      handler={handlePriceRange}
                    />
                    <button
                      onClick={() =>
                        handlePriceRange({ from: 100_000, to: 10_000_000 })
                      }
                      className="self-center rounded-md bg-main px-2 py-1 capitalize text-white transition-all hover:bg-mainHover"
                    >
                      reset
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

              <Image
                src={moneyIcon}
                alt="money"
                className="min-w-6 shrink-0"
                width={24}
                height={24}
              />
            </div>
          </div>

          <Button
            onClick={submitFilter}
            variant={"link"}
            className="aspect-square h-12 w-full shrink-0 rounded-full border-none bg-alt p-3 md:w-12"
          >
            <Image
              src={searchIcon}
              alt="search"
              className="min-w-6 shrink-0"
              width={24}
              height={24}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomeFilter;
