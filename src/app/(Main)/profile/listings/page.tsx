import { getProperties, getUser } from "@/services/prismaApi";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PropertyWithImages, UserWithProperties } from "@/lib/types";
import EmptyListing from "@/features/profile/components/EmptyListing";
import PropertyItem from "@/features/properties/components/PropertyItem";
import ListingsTable from "@/features/profile/components/ListingsTable";

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
    <ul className="w-full">
      <ListingsTable properties={properties} />
    </ul>
  );
}

export default page;
