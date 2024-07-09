import Image from "next/image";
import heroImage from "./../../public/assets/hero-image.jpg";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import HomeFilter from "@/components/HomeFilter";

export default function Home() {
  return (
    <div className=" ">
      {/* background image */}
      <Image
        src={heroImage}
        alt="hero"
        className="absolute bottom-0 -left-56 -z-10 animate-popup-hero "
      />
      <div className="container flex justify-center items-center h-full">
        <div>
          <div className="text-center space-y-4">
            <h1 className="capitalize text-5xl font-semibold text-blacker">
              Discover your perfect home
            </h1>
            <p className="text-2xl text-font uppercase">
              Find your dream home or sell your property with ease in our
              trusted marketplace.
            </p>
          </div>
          <div className="flex justify-center items-center gap-4 font-poppins mt-6">
            <Button className="text-xl capitalize font-medium border border-main">
              <Link href={"/properties"}>find property</Link>
            </Button>
            <Button
              variant={"outline"}
              className="text-xl capitalize bg-transparent font-medium text-main border-main"
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
