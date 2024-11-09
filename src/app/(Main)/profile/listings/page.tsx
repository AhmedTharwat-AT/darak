import { getProperties, getUser } from "@/services/prismaApi";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PropertyWithImages, UserWithProperties } from "@/lib/types";
import EmptyListing from "@/features/profile/components/EmptyListing";
import PropertyItem from "@/features/properties/components/PropertyItem";

async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin?callbackUrl=/profile/listings");
  }

  const user: UserWithProperties = await getUser(session.user.email);
  if (!user) {
    redirect("/signin?callbackUrl=/profile/listings");
  }

  const properties = user.properties;

  if (!properties.length) return <EmptyListing />;

  return (
    <ul className="grid h-fit grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
      {properties.map((bookmarked: PropertyWithImages) => (
        <PropertyItem isOwner key={bookmarked.id} property={bookmarked} />
      ))}
    </ul>
  );
}

export default page;
