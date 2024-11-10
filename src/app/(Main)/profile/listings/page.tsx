import { auth } from "@/auth";
import { getUser } from "@/services/prismaApi";
import { UserWithProperties } from "@/lib/types";
import { redirect } from "next/navigation";
import AnimatedLink from "@/components/AnimatedLink";

import { Button } from "@/components/ui/button";
import EmptyListing from "@/features/profile/components/EmptyListing";
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
      <div className="mb-3 flex items-center justify-end">
        <Button asChild>
          <AnimatedLink href="/properties/new">
            Create new property
          </AnimatedLink>
        </Button>
      </div>
      <ListingsTable properties={properties} />
    </ul>
  );
}

export default page;
