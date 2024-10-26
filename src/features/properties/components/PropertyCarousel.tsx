import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IPropertyImage } from "@/lib/types";
import Image from "next/image";

function PropertyCarousel({ images }: { images: IPropertyImage[] }) {
  return (
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
                className="object-cover size-full overflow-hidden rounded-xl"
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
              className="object-cover size-full overflow-hidden rounded-xl"
            />
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious className="absolute left-[30%] bottom-5 hover:bg-gray-200 " />
      <CarouselNext className="absolute right-[30%] bottom-5 hover:bg-gray-200" />
    </Carousel>
  );
}

export default PropertyCarousel;
