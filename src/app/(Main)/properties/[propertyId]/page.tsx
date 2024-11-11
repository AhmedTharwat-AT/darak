import { PropertyWithImages } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { getProperty } from "@/services/prismaApi";

import BackButton from "@/components/BackButton";
import Error from "@/components/Error";
import BookmarkActionBtn from "@/features/properties/components/BookmarkActionBtn";
import PropertyCarousel from "@/features/properties/components/PropertyCarousel";
import PropertyContacts from "@/features/properties/components/PropertyContacts";
import PropertyFeatures from "@/features/properties/components/PropertyFeatures";
import { FaLocationDot } from "react-icons/fa6";
import { redirect } from "next/navigation";

async function page(props: { params: Promise<{ propertyId: string }> }) {
  const params = await props.params;
  const property: PropertyWithImages = await getProperty(params.propertyId);

  if (!property) return <Error message="Property was not found" />;

  if (property.status !== "approved") redirect("/properties");

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

              <BookmarkActionBtn type="add" propertyId={params.propertyId} />
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
              <PropertyContacts property={property} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
