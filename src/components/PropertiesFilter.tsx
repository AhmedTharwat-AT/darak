"use client";

import Image from "next/image";
import useFilter from "@/hooks/useFilter";
import { Button } from "./ui/button";
import { formatCurrency } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import QuantityHandler from "./QuantityHandler";
import Slider from "./Slider";

function PropertiesFilter() {
  const {
    propertyType,
    handlePropertyType,
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
  } = useFilter();

  return (
    <div className="font-poppins w-full max-w-80 bg-bgDark p-6 rounded-lg">
      <h2 className="uppercase font-medium text-blacker mb-10">filter</h2>

      <div className="text-main border-main border rounded-lg overflow-hidden mb-6">
        <Button
          className={`text-main py-2 w-1/2 rounded-bl-none disabled:opacity-100 font-medium rounded-r-none uppercase ${
            propertyType === "rent" ? "bg-main text-white" : "bg-transparent"
          }`}
          disabled={propertyType === "rent"}
          onClick={() => handlePropertyType("rent")}
        >
          rent
        </Button>
        <Button
          className={`text-main py-2 w-1/2 rounded-bl-none disabled:opacity-100 font-medium rounded-l-none uppercase ${
            propertyType === "sell" ? "bg-main text-white" : "bg-transparent"
          }`}
          disabled={propertyType === "sell"}
          onClick={() => handlePropertyType("sell")}
        >
          sale
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2 pb-4 border-b border-grayLight">
          <h3 className="text-font capitalize">Location</h3>
          <div className="flex  items-center w-full bg-white p-1 ps-2 rounded-lg">
            <input
              type="text"
              name="location"
              id="location"
              className="w-full"
              placeholder="Search location"
            />
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
          <Select>
            <SelectTrigger className="w-full p-1 ps-2  focus:ring-0 border-none bg-white rounded-lg ring-0 shadow-none appearance-none">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent side="bottom">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="building">Building</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 pb-4 border-b border-grayLight">
          <h3 className="text-font capitalize ">space</h3>

          <Slider
            render={(value) => (
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
          <h3 className="text-font capitalize ">Price</h3>
          <Slider
            render={(value) => (
              <div className="flex gap-2 items-center">
                <p className="font-medium">{formatCurrency(value.from)}</p>
                <span>&mdash;</span>
                <p className="font-medium">{formatCurrency(value.to)}</p>
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
  );
}

export default PropertiesFilter;
