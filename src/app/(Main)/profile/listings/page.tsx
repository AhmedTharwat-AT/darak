import { getUser } from "@/services/prismaApi";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PropertyWithImages, UserWithProperties } from "@/lib/types";
import EmptyListing from "@/features/profile/components/EmptyListing";
import PropertyItem from "@/features/properties/components/PropertyItem";

async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin?callbackUrl=/profile");
  }

  const user: UserWithProperties = await getUser(session.user.email);
  if (!user) {
    redirect("/");
  }

  const properties = user.properties;

  if (!properties.length) return <EmptyListing />;

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((bookmarked: PropertyWithImages) => (
        <PropertyItem key={bookmarked.id} property={bookmarked} />
      ))}
    </ul>
  );
}

export default page;
