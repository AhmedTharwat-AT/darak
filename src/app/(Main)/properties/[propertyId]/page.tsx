import PropertyFeatures from "@/components/PropertyFeatures";
import { Button } from "@/components/ui/button";
import { getProperty } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaLocationDot, FaPhone } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
import ImagesCarousel from "./ImagesCarousel";
import BackButton from "@/components/BackButton";

async function page({ params }: { params: { propertyId: string } }) {
  const property = await getProperty(params.propertyId);

  if (!property) return <div className="container">Property not found</div>;

  return (
    <main className="font-poppins">
      <div className="container  flex flex-col my-12">
        <BackButton text="Back" />

        <div className="grid grid-cols-1 bp:grid-cols-2  grow mt-12 gap-8">
          <div className="relative rounded-xl overflow-hidden xl:min-h-[567px] min-h-96">
            <ImagesCarousel images={property.images} />
          </div>

          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <FaLocationDot className="fill-main size-5" />
              <p className="text-xl">{property.location}</p>
            </div>

            <h2 className="text-2xl mt-2 mb-4 line-clamp-1">
              {property.title}
            </h2>

            <hr className="bg-stroke my-3" />

            <div>
              <h3 className="text-xl text-font mb-4">Features</h3>
              <PropertyFeatures
                property={property}
                featureStyle="flex-row flex gap-3 text-xl text-main [&_svg]:size-6 [&_svg]:fill-font"
              />
            </div>

            <hr className="bg-stroke mb-4 mt-2" />

            <div>
              <h3 className="text-xl text-font  mb-4">Description</h3>
              <p className="text-black">{property.description}</p>
            </div>

            <div className="flex flex-wrap justify-between items-end mt-auto pt-8 gap-8">
              <p className="font-bold text-3xl line-clamp-1">
                {formatCurrency(property.price)}
              </p>
              <div className="flex ms-auto flex-wrap items-stretch gap-4">
                <Button className="space-x-2">
                  <FaPhone className="size-4 " />
                  <span className="text-xl">Call</span>
                </Button>
                <Button className="bg-[#67C15E] space-x-2">
                  <RiWhatsappFill className="size-6" />
                  <span className="text-xl">WhatsApp</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
