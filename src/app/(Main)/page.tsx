import Image from "next/image";
import { Suspense } from "react";

import AnimatedLink from "@/components/AnimatedLink";
import HomeFilter from "@/components/HomeFilter";
import { Button } from "@/components/ui/button";
import FilterProvider from "@/context/FilterContext";
import heroImage from "../../../public/assets/hero-image.jpg";

export default function Home() {
  return (
    <div>
      {/* background image */}
      <Image
        src={heroImage}
        alt="hero"
        className="absolute inset-0 -left-52 z-[1] h-full w-3/4 animate-popup-hero object-cover"
      />

      <div className="container relative z-10 flex h-full items-center justify-center py-8 xl:py-12">
        <div className="w-full">
          <div className="space-y-4 text-center font-playfair">
            <h1 className="text-2xl font-semibold capitalize text-blacker sm:text-3xl lg:text-5xl">
              Discover your perfect home
            </h1>
            <p className="text-sm uppercase tracking-wide text-font sm:text-base lg:text-2xl">
              Find your dream home or sell your property with ease in our
              trusted marketplace.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 font-poppins">
            <Button className="border border-main text-sm font-medium capitalize sm:text-lg lg:text-xl">
              <AnimatedLink href={"/properties"}>find property</AnimatedLink>
            </Button>
            <Button
              variant={"outline"}
              className="border-main bg-transparent text-sm font-medium capitalize text-main sm:text-lg lg:text-xl"
            >
              sell property
            </Button>
          </div>

          <Suspense fallback={<div>Loading home filter...</div>}>
            <FilterProvider>
              <HomeFilter />
            </FilterProvider>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
