import { auth } from "@/auth";
import { getUser } from "@/services/prismaApi";
import { UserWithProperties } from "@/lib/types";
import { redirect } from "next/navigation";
import AnimatedLink from "@/components/AnimatedLink";

import { Button } from "@/components/ui/button";
import EmptyListing from "@/features/profile/components/EmptyListing";
import ListingsTable from "@/features/profile/components/ListingsTable";
import { FaPlus } from "react-icons/fa";

async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin?callbackUrl=/profile/listings");
  }

  const user: UserWithProperties = await getUser(session.user.email);
  if (!user) {
    redirect("/signin?callbackUrl=/profile/listings");
  }

  console.log("listings user : ", user);

  const properties = user.properties;

  if (!properties.length) return <EmptyListing />;

  return (
    <ul className="w-full">
      <div className="mb-3 flex items-center justify-end">
        <AnimatedLink
          href="/properties/new"
          className="flex items-center gap-2"
        >
          <Button className="flex items-center gap-2 hover:bg-main/90">
            <span>Create new property</span>
            <FaPlus />
          </Button>
        </AnimatedLink>
      </div>
      <ListingsTable properties={properties} />
    </ul>
  );
}

export default page;
