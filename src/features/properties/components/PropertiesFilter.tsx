"use client";

import { cn, formatCurrency } from "@/lib/utils";

import LocationInput from "@/components/LocationInput";
import PropertyTypeMenu from "@/components/PropertyTypeMenu";
import QuantityHandler from "@/components/QuantityHandler";
import Slider from "@/components/Slider";
import { Button } from "@/components/ui/button";

import LocationIcon from "@/components/LocationIcon";
import useFilter from "@/hooks/useFilter";
import { useTranslation } from "@/context/TranslationProvider";

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
    location,
    handleLocation,
    propertyType,
    handlePropertyType,
  } = useFilter();

  const { dictionary } = useTranslation();

  return (
    <div
      className={cn(
        "top-4 h-full max-h-screen w-full shrink-0 rounded-lg bg-bgDark p-6 font-poppins md:sticky md:overflow-y-auto",
        className,
      )}
    >
      <div>
        {showHeader && (
          <h2 className="mb-10 font-medium uppercase text-blacker rtl:mb-6 rtl:text-xl">
            {dictionary.filter.title}
          </h2>
        )}

        <div className="mb-6 overflow-hidden rounded-lg border border-main text-main">
          <Button
            className={`w-1/2 py-2 font-medium uppercase text-main disabled:opacity-100 ltr:rounded-r-none rtl:rounded-l-none ${
              propertyMode === "rent" ? "bg-main text-white" : "bg-transparent"
            }`}
            disabled={propertyMode === "rent"}
            onClick={() => handlePropertyMode("rent")}
          >
            {dictionary.filter.mode.rent}
          </Button>

          <Button
            className={`w-1/2 py-2 font-medium uppercase text-main disabled:opacity-100 ltr:rounded-l-none rtl:rounded-r-none ${
              propertyMode === "sell" ? "bg-main text-white" : "bg-transparent"
            }`}
            disabled={propertyMode === "sell"}
            onClick={() => handlePropertyMode("sell")}
          >
            {dictionary.filter.mode.sell}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2 border-b border-grayLight pb-4">
            <h3 className="capitalize text-font">
              {dictionary.filter.location.label}
            </h3>
            <div className="flex w-full items-center rounded-lg bg-white p-1 ps-2">
              <LocationInput
                currentLocation={location}
                handleLocation={handleLocation}
                className="w-full border-none p-0"
              />
              <LocationIcon />
            </div>
          </div>

          <div className="space-y-2 border-b border-grayLight pb-4">
            <h3 className="capitalize text-font">
              {dictionary.filter.type.label}
            </h3>
            <PropertyTypeMenu
              propertyType={propertyType}
              handlePropertyType={handlePropertyType}
            />
          </div>

          <div className="space-y-2 border-b border-grayLight pb-4">
            <div className="flex items-center justify-between">
              <h3 className="capitalize text-font">
                {dictionary.filter.space}
              </h3>
              <button
                onClick={() => handleSpaceRange({ from: 50, to: 200 })}
                className="capitalize underline"
              >
                reset
              </button>
            </div>

            <Slider
              renderLabel={(value) => (
                <div className="flex items-center justify-between gap-2 rtl:flex-row-reverse">
                  <p className="font-medium">
                    {value.from} m<sup>2</sup>
                  </p>
                  <p className="font-medium">
                    {value.to} m<sup>2</sup>
                  </p>
                </div>
              )}
              min={10}
              max={10000}
              value={space}
              handler={handleSpaceRange}
            />
          </div>

          <div className="space-y-2 border-b border-grayLight pb-4">
            <h3 className="capitalize text-font"> {dictionary.filter.rooms}</h3>
            <QuantityHandler name="rooms" value={rooms} handler={handleRooms} />
          </div>

          <div className="space-y-2 border-b border-grayLight pb-4">
            <h3 className="capitalize text-font">
              {dictionary.filter.bathrooms}
            </h3>
            <QuantityHandler
              name="bathrooms"
              value={bathrooms}
              handler={handleBathrooms}
            />
          </div>

          <div className="space-y-2 border-b border-grayLight pb-4">
            <div className="flex items-center justify-between">
              <h3 className="capitalize text-font">
                {dictionary.filter.price}
              </h3>
              <button
                onClick={() => handlePriceRange({ from: 0, to: 1000000 })}
                className="capitalize underline"
              >
                reset
              </button>
            </div>

            <Slider
              renderLabel={(value) => (
                <div className="flex flex-wrap items-center gap-2 rtl:flex-row-reverse">
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
              max={100_000_000}
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
              {dictionary.filter.cancel}
            </Button>
            <Button
              onClick={submitFilter}
              className="w-32 rounded-lg border-main bg-opacity-0 font-medium capitalize transition-all hover:opacity-90"
            >
              {dictionary.filter.apply}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesFilter;
