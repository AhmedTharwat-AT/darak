import { auth } from "@/auth";
import { getUser } from "@/services/prismaApi";
import { redirect } from "next/navigation";
import { PropertyWithImages, UserWithProperties } from "@/lib/types";
import EmptyBookmarks from "@/features/properties/components/EmptyBookmarks";
import PropertyItem from "@/features/properties/components/PropertyItem";
import SignoutWhenUserDeleted from "@/features/auth/components/SignoutWhenUserDeleted";
import { getDictionary } from "../../dictionaries";

async function page({ params }: { params: Promise<{ locale: string }> }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/en/signin?callbackUrl=/en/bookmark");
  }

  const user: UserWithProperties = await getUser(session.user.email || "");
  if (!user) {
    return <SignoutWhenUserDeleted />;
  }

  const bookmarkedProperties = user.bookmarked_properties.map(
    (bookmarked) => bookmarked.property,
  );

  if (!bookmarkedProperties.length) return <EmptyBookmarks />;

  const locale = (await params).locale;
  const dictionary = await getDictionary(locale);

  return (
    <div>
      <div className="container py-8 font-poppins">
        <h1 className="mb-4 text-center text-xl font-medium capitalize sm:text-2xl md:mb-6">
          {dictionary.bookmarks.title}
        </h1>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookmarkedProperties.map((bookmarked: PropertyWithImages) => (
            <PropertyItem
              key={bookmarked.id}
              property={bookmarked}
              isBookmarked={true}
              dictionary={dictionary}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default page;
