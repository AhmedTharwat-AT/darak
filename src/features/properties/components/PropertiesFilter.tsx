"use client";

import Image from "next/image";
import { cn, formatCurrency } from "@/lib/utils";
import { useFilterContext } from "@/context/FilterContext";

import QuantityHandler from "../../../components/QuantityHandler";
import Slider from "../../../components/Slider";
import PropertyTypeMenu from "../../../components/PropertyTypeMenu";
import LocationInput from "../../../components/LocationInput";
import { Button } from "../../../components/ui/button";

import gpsIcon from "@/assets/icons/gps.svg";

function PropertiesFilter({
  className,
  showHeader = true,
}: {
  className?: string;
  showHeader?: boolean;
}) {
  const {
    propertyMode,
    handlePropertyMode,
    handleSpaceRange,
    space,
    rooms,
    handleRooms,
    bathrooms,
    handleBathrooms,
    priceRange,
    handlePriceRange,
    submitFilter,
    reset,
  } = useFilterContext();
  // max-h-[870px]
  return (
    <div
      className={cn(
        "top-4 h-full max-h-screen w-full shrink-0 rounded-lg bg-bgDark p-6 font-poppins md:sticky md:overflow-y-auto",
        className,
      )}
    >
      <div>
        {showHeader && (
          <h2 className="mb-10 font-medium uppercase text-blacker">filter</h2>
        )}

        <div className="mb-6 overflow-hidden rounded-lg border border-main text-main">
          <Button
            className={`w-1/2 rounded-r-none rounded-bl-none py-2 font-medium uppercase text-main disabled:opacity-100 ${
              propertyMode === "rent" ? "bg-main text-white" : "bg-transparent"
            }`}
            disabled={propertyMode === "rent"}
            onClick={() => handlePropertyMode("rent")}
          >
            rent
          </Button>

          <Button
            className={`w-1/2 rounded-l-none rounded-bl-none py-2 font-medium uppercase text-main disabled:opacity-100 ${
              propertyMode === "sell" ? "bg-main text-white" : "bg-transparent"
            }`}
            disabled={propertyMode === "sell"}
            onClick={() => handlePropertyMode("sell")}
          >
            sell
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2 border-b border-grayLight pb-4">
            <h3 className="capitalize text-font">Location</h3>
            <div className="flex w-full items-center rounded-lg bg-white p-1 ps-2">
              <LocationInput icon={false} className="w-full border-none p-0" />
              <Image
                src={gpsIcon}
                alt="search"
                className="size-8 rounded-lg bg-alt p-1"
                width={20}
                height={20}
              />
            </div>
          </div>

          <div className="space-y-2 border-b border-grayLight pb-4">
            <h3 className="capitalize text-font">type</h3>
            <PropertyTypeMenu className="w-full appearance-none rounded-lg border-none bg-white p-1 ps-2 shadow-none ring-0 focus:ring-0" />
          </div>

          <div className="space-y-2 border-b border-grayLight pb-4">
            <div className="flex items-center justify-between">
              <h3 className="capitalize text-font">space</h3>
              <button
                onClick={() => handleSpaceRange({ from: 50, to: 200 })}
                className="capitalize underline"
              >
                reset
              </button>
            </div>

            <Slider
              renderLabel={(value) => (
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">
                    {value.from} m<sup>2</sup>
                  </p>
                  <p className="font-medium">
                    {value.to} m<sup>2</sup>
                  </p>
                </div>
              )}
              min={10}
              max={1000}
              value={space}
              handler={handleSpaceRange}
            />
          </div>

          <div className="space-y-2 border-b border-grayLight pb-4">
            <h3 className="capitalize text-font">Rooms</h3>
            <QuantityHandler value={rooms} handler={handleRooms} />
          </div>

          <div className="space-y-2 border-b border-grayLight pb-4">
            <h3 className="capitalize text-font">Bathrooms</h3>
            <QuantityHandler value={bathrooms} handler={handleBathrooms} />
          </div>

          <div className="space-y-2 border-b border-grayLight pb-4">
            <div className="flex items-center justify-between">
              <h3 className="capitalize text-font">Price</h3>
              <button
                onClick={() => handlePriceRange({ from: 0, to: 1000000 })}
                className="capitalize underline"
              >
                reset
              </button>
            </div>

            <Slider
              renderLabel={(value) => (
                <div className="flex flex-wrap items-center gap-2">
                  <p className="max-w-full truncate font-medium">
                    {formatCurrency(value.from)}
                  </p>
                  <span className="h-[6px] leading-[6px]">&mdash;</span>

                  <p className="max-w-full truncate font-medium">
                    {formatCurrency(value.to)}
                  </p>
                </div>
              )}
              min={10}
              max={10000000}
              step={1000}
              value={priceRange}
              handler={handlePriceRange}
            />
          </div>

          <div className="flex justify-between gap-4">
            <Button
              onClick={reset}
              className="w-32 rounded-lg border border-main bg-transparent font-medium capitalize text-main"
            >
              cancel
            </Button>
            <Button
              onClick={submitFilter}
              className="w-32 rounded-lg border-main bg-opacity-0 font-medium capitalize transition-all hover:opacity-90"
            >
              apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesFilter;
