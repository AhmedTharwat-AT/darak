import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import heroImage from "./../../public/assets/hero-image.jpg";
import { Button } from "@/components/ui/button";
import HomeFilter from "@/components/HomeFilter";

export default function Home() {
  return (
    <div className=" ">
      {/* background image */}
      <Image
        src={heroImage}
        alt="hero"
        className="absolute inset-0  h-full w-3/4 -left-52 z-[1] animate-popup-hero "
      />

      <div className="container py-12 flex relative z-10  justify-center items-center h-full">
        <div className="w-full ">
          <div className="text-center space-y-4 font-playfair">
            <h1 className="capitalize text-2xl sm:text-3xl lg:text-5xl font-semibold text-blacker">
              Discover your perfect home
            </h1>
            <p className="sm:text-base text-sm lg:text-2xl text-font uppercase tracking-wide">
              Find your dream home or sell your property with ease in our
              trusted marketplace.
            </p>
          </div>

          <div className="flex justify-center items-center gap-4 font-poppins mt-6">
            <Button className="text-sm sm:text-lg lg:text-xl capitalize font-medium border border-main">
              <Link href={"/properties"}>find property</Link>
            </Button>
            <Button
              variant={"outline"}
              className="text-sm sm:text-lg lg:text-xl capitalize bg-transparent font-medium text-main border-main"
            >
              sell property
            </Button>
          </div>

          <Suspense fallback={null}>
            <HomeFilter />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
