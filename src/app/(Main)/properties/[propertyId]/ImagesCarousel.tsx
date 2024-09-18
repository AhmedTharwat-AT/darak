import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PropertyImage } from "@/lib/types";
import Image from "next/image";

function ImagesCarousel({ images }: { images: PropertyImage[] }) {
  return (
    <Carousel className="h-full">
      <CarouselContent className="h-full">
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <Image
              src={image.url}
              alt={"property image"}
              width={400}
              height={200}
              className="object-cover size-full overflow-hidden rounded-xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-[30%] bottom-5 hover:bg-gray-200 " />
      <CarouselNext className="absolute right-[30%] bottom-5 hover:bg-gray-200" />
    </Carousel>
  );
}

export default ImagesCarousel;
