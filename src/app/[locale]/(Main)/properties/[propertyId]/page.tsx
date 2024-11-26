import { PropertyWithImages, UserWithProperties } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { getProperty, getUser } from "@/services/prismaApi";

import BackButton from "@/components/BackButton";
import Error from "@/components/Error";
import BookmarkActionBtn from "@/features/properties/components/BookmarkActionBtn";
import PropertyCarousel from "@/features/properties/components/PropertyCarousel";
import PropertyContacts from "@/features/properties/components/PropertyContacts";
import PropertyFeatures from "@/features/properties/components/PropertyFeatures";
import { FaLocationDot } from "react-icons/fa6";
import { redirect } from "next/navigation";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { auth } from "@/auth";

async function page(props: {
  params: Promise<{ propertyId: string; locale: string }>;
}) {
  const { propertyId, locale } = await props.params;
  const property: PropertyWithImages = await getProperty(propertyId);

  if (!property || property.status !== "approved")
    return <Error message="Property was not found" />;

  const dictionary = await getDictionary(locale);

  const session = await auth();
  let user: UserWithProperties;
  let isBookmarked = false;

  if (session?.user) {
    user = await getUser(session.user.email);

    if (
      user &&
      user.bookmarked_properties.some((p) => p.propertyId === property.id)
    ) {
      isBookmarked = true;
    }
  }

  return (
    <main className="font-poppins">
      <div className="container my-8 flex flex-col bp:my-12">
        <BackButton text="Back" />

        <div className="mt-8 grid grow grid-cols-1 gap-8 bp:mt-12 bp:grid-cols-2">
          <PropertyCarousel images={property.images} />

          <div className="flex flex-col">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <FaLocationDot className="size-5 fill-main" />
                  <p className="sm:text-xl">{property.location}</p>
                </div>

                <h2 className="mb-4 mt-2 line-clamp-1 text-lg sm:text-2xl">
                  {property.title}
                </h2>
              </div>

              <BookmarkActionBtn
                type={isBookmarked ? "remove" : "add"}
                propertyId={propertyId}
              />
            </div>

            <hr className="my-3 bg-stroke" />

            <div>
              <h3 className="mb-2 text-font sm:mb-4 sm:text-xl">
                {dictionary.property.features}
              </h3>
              <PropertyFeatures
                property={property}
                dictionary={dictionary}
                featureStyle="flex-row flex sm:gap-3 sm:text-xl text-main sm:[&_svg]:size-6 [&_svg]:fill-font"
              />
            </div>

            <hr className="my-3 bg-stroke" />

            <div>
              <h3 className="mb-2 text-font sm:mb-4 sm:text-xl">
                {dictionary.property.description}
              </h3>
              <p className="text-black max-sm:text-sm">
                {property.description}
              </p>
            </div>

            <div className="mt-auto flex flex-wrap items-end justify-between gap-8 pt-8">
              <p className="break-all text-xl font-bold sm:text-3xl">
                {formatCurrency(property.price, locale)}
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
