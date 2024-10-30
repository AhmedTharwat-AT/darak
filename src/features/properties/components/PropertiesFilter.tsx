"use client";

import Image from "next/image";
import { cn, formatCurrency } from "@/lib/utils";
import { useFilterContext } from "@/context/FilterContext";

import QuantityHandler from "../../../components/QuantityHandler";
import Slider from "../../../components/Slider";
import PropertyTypeMenu from "../../../components/PropertyTypeMenu";
import LocationInput from "../../../components/LocationInput";
import { Button } from "../../../components/ui/button";

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
        "font-poppins w-full  bg-bgDark p-6 rounded-lg max-h-screen h-full md:sticky top-4 md:overflow-y-auto shrink-0",
        className
      )}
    >
      <div>
        {showHeader && (
          <h2 className="uppercase font-medium text-blacker mb-10">filter</h2>
        )}

        <div className="text-main border-main border rounded-lg overflow-hidden mb-6">
          <Button
            className={`text-main py-2 w-1/2 rounded-bl-none disabled:opacity-100 font-medium rounded-r-none uppercase ${
              propertyMode === "rent" ? "bg-main text-white" : "bg-transparent"
            }`}
            disabled={propertyMode === "rent"}
            onClick={() => handlePropertyMode("rent")}
          >
            rent
          </Button>

          <Button
            className={`text-main py-2 w-1/2 rounded-bl-none disabled:opacity-100 font-medium rounded-l-none uppercase ${
              propertyMode === "sell" ? "bg-main text-white" : "bg-transparent"
            }`}
            disabled={propertyMode === "sell"}
            onClick={() => handlePropertyMode("sell")}
          >
            sell
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2 pb-4 border-b border-grayLight">
            <h3 className="text-font capitalize">Location</h3>
            <div className="flex  items-center w-full bg-white p-1 ps-2 rounded-lg">
              <LocationInput icon={false} className="border-none p-0 w-full" />
              <Image
                src="/assets/icons/gps.svg"
                alt="search"
                className="bg-alt p-1 size-8 rounded-lg"
                width={20}
                height={20}
              />
            </div>
          </div>

          <div className="space-y-2 pb-4 border-b border-grayLight">
            <h3 className="text-font capitalize ">type</h3>
            <PropertyTypeMenu className="w-full p-1 ps-2  focus:ring-0 border-none bg-white rounded-lg ring-0 shadow-none appearance-none" />
          </div>

          <div className="space-y-2 pb-4 border-b border-grayLight">
            <div className="flex justify-between items-center">
              <h3 className="text-font capitalize ">space</h3>
              <button
                onClick={() => handleSpaceRange({ from: 50, to: 200 })}
                className="  capitalize underline "
              >
                reset
              </button>
            </div>

            <Slider
              renderLabel={(value) => (
                <div className="flex justify-between gap-2 items-center">
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

          <div className="space-y-2 pb-4 border-b border-grayLight">
            <h3 className="text-font capitalize ">Rooms</h3>
            <QuantityHandler value={rooms} handler={handleRooms} />
          </div>

          <div className="space-y-2 pb-4 border-b border-grayLight">
            <h3 className="text-font capitalize ">Bathrooms</h3>
            <QuantityHandler value={bathrooms} handler={handleBathrooms} />
          </div>

          <div className="space-y-2 pb-4 border-b border-grayLight">
            <div className="flex justify-between items-center">
              <h3 className="text-font capitalize ">Price</h3>
              <button
                onClick={() => handlePriceRange({ from: 0, to: 1000000 })}
                className="  capitalize underline "
              >
                reset
              </button>
            </div>

            <Slider
              renderLabel={(value) => (
                <div className="flex gap-2 flex-wrap items-center">
                  <p className="font-medium max-w-full truncate">
                    {formatCurrency(value.from)}
                  </p>
                  <span className="h-[6px] leading-[6px]">&mdash;</span>

                  <p className="font-medium max-w-full truncate">
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
              className="bg-transparent border-main border text-main w-32 font-medium capitalize rounded-lg"
            >
              cancel
            </Button>
            <Button
              onClick={submitFilter}
              className=" border-main hover:opacity-90 transition-all  w-32 font-medium capitalize rounded-lg bg-opacity-0"
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
