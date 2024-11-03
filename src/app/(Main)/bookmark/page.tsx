import { auth, signOut } from "@/auth";
import EmptyBookmarks from "@/features/properties/components/EmptyBookmarks";
import { getUser } from "@/services/prismaApi";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();
  if (!session?.user) redirect("/signin");

  const user = await getUser(session.user.email || "");

  if (!user) {
    redirect("/");
  }
  const bookmarkedProperties = user.bookmarked_properties;

  if (bookmarkedProperties.length == 0) return <EmptyBookmarks />;

  return (
    <div>
      <div className="container">bookmarked</div>
    </div>
  );
}

export default page;
