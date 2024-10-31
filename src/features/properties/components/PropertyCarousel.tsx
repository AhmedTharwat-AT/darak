import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PropertyImage } from "@prisma/client";
import Image from "next/image";

function PropertyCarousel({ images }: { images: PropertyImage[] }) {
  return (
    <div className="relative min-h-96 overflow-hidden rounded-xl xl:min-h-[567px]">
      <Carousel className="h-full">
        <CarouselContent className="h-full">
          {images.length > 0 ? (
            images.map((image) => (
              <CarouselItem key={image.id}>
                <Image
                  src={image.url}
                  alt={"property image"}
                  width={400}
                  height={200}
                  className="size-full overflow-hidden rounded-xl object-cover"
                />
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <Image
                src={"https://placehold.co/600x400"}
                alt={"property image"}
                width={400}
                height={200}
                className="size-full overflow-hidden rounded-xl object-cover"
              />
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="absolute bottom-5 left-[30%] hover:bg-gray-200" />
        <CarouselNext className="absolute bottom-5 right-[30%] hover:bg-gray-200" />
      </Carousel>
    </div>
  );
}

export default PropertyCarousel;
