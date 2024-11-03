import { getProperty } from "@/services/prismaApi";
import { PropertyWithImages } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

import BackButton from "@/components/BackButton";
import Error from "@/components/Error";
import { Button } from "@/components/ui/button";
import BookmarkProperty from "@/features/properties/components/BookmarkProperty";
import PropertyCarousel from "@/features/properties/components/PropertyCarousel";
import PropertyFeatures from "@/features/properties/components/PropertyFeatures";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";

async function page(props: { params: Promise<{ propertyId: string }> }) {
  const params = await props.params;
  const property: PropertyWithImages = await getProperty(params.propertyId);

  if (!property) return <Error message="Property not found" />;

  return (
    <main className="font-poppins">
      <div className="container my-12 flex flex-col">
        <BackButton text="Back" />

        <div className="mt-12 grid grow grid-cols-1 gap-8 bp:grid-cols-2">
          <PropertyCarousel images={property.images} />

          <div className="flex flex-col">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <FaLocationDot className="size-5 fill-main" />
                  <p className="text-xl">{property.location}</p>
                </div>

                <h2 className="mb-4 mt-2 line-clamp-1 text-2xl">
                  {property.title}
                </h2>
              </div>

              <BookmarkProperty propertyId={params.propertyId} />
            </div>

            <hr className="my-3 bg-stroke" />

            <div>
              <h3 className="mb-4 text-xl text-font">Features</h3>
              <PropertyFeatures
                property={property}
                featureStyle="flex-row flex gap-3 text-xl text-main [&_svg]:size-6 [&_svg]:fill-font"
              />
            </div>

            <hr className="mb-4 mt-2 bg-stroke" />

            <div>
              <h3 className="mb-4 text-xl text-font">Description</h3>
              <p className="text-black">{property.description}</p>
            </div>

            <div className="mt-auto flex flex-wrap items-end justify-between gap-8 pt-8">
              <p className="line-clamp-1 text-3xl font-bold">
                {formatCurrency(property.price)}
              </p>
              <div className="ms-auto flex flex-wrap items-stretch gap-4">
                {property.phone && (
                  <Button className="space-x-2">
                    <FaPhone className="size-4" />
                    <span className="text-xl">Call</span>
                  </Button>
                )}
                {property.whatsapp && (
                  <Button className="space-x-2 bg-[#67C15E]">
                    <RiWhatsappFill className="size-6" />
                    <span className="text-xl">WhatsApp</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
