import { Suspense } from "react";

import AnimatedLink from "@/components/AnimatedLink";
import HeroImage from "@/components/HeroImage";
import HomeFilter from "@/components/HomeFilter";
import { Button } from "@/components/ui/button";
import FilterProvider from "@/context/FilterContext";
import { getDictionary } from "../dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="relative z-10 h-full overflow-y-hidden">
      <HeroImage className="object-[-400px_100%] max-md:object-cover md:object-[-300px_100%]" />

      <div className="container relative z-10 flex h-full items-center justify-center py-8 xl:py-12">
        <div className="w-full">
          <div className="space-y-4 text-center font-playfair">
            <h1 className="text-2xl font-semibold capitalize text-blacker sm:text-3xl lg:text-5xl">
              {dictionary.home.title}
            </h1>
            <p className="text-sm uppercase tracking-wide text-font sm:text-base lg:text-2xl">
              {dictionary.home.description}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 font-poppins">
            <Button className="border border-main text-sm font-medium capitalize sm:text-lg lg:text-xl">
              <AnimatedLink href={"/properties"}>
                {dictionary.home.buttons.find}
              </AnimatedLink>
            </Button>

            <Button
              variant={"outline"}
              className="border-main bg-transparent text-sm font-medium capitalize text-main sm:text-lg lg:text-xl"
            >
              <AnimatedLink href={"/properties/new"}>
                {dictionary.home.buttons.sell}
              </AnimatedLink>
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
