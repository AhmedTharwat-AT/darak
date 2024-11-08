import { auth } from "@/auth";
import { getUser } from "@/services/prismaApi";
import { redirect } from "next/navigation";
import { PropertyWithImages, UserWithProperties } from "@/lib/types";
import EmptyBookmarks from "@/features/properties/components/EmptyBookmarks";
import PropertyItem from "@/features/properties/components/PropertyItem";

async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin?callbackUrl=/bookmark");
  }

  const user: UserWithProperties = await getUser(session.user.email || "");
  if (!user) {
    redirect("/signin?callbackUrl=/bookmark");
  }

  const bookmarkedProperties = user.bookmarked_properties.map(
    (bookmarked) => bookmarked.property,
  );

  if (!bookmarkedProperties.length) return <EmptyBookmarks />;

  return (
    <div>
      <div className="container py-6 font-poppins">
        <h1 className="my-4 text-center text-xl font-medium capitalize sm:text-2xl md:my-6">
          my saved properties
        </h1>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookmarkedProperties.map((bookmarked: PropertyWithImages) => (
            <PropertyItem
              key={bookmarked.id}
              property={bookmarked}
              bookmarked={true}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default page;
