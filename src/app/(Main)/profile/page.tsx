import { auth } from "@/auth";
import UserInfo from "@/features/profile/components/UserInfo";
import { UserWithProperties } from "@/lib/types";
import { getUser } from "@/services/prismaApi";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin?callbackUrl=/profile");
  }

  const user: UserWithProperties = await getUser(session.user.email);
  if (!user) {
    redirect("/signin?callbackUrl=/profile");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Account information</h1>
      <UserInfo user={user} />
    </div>
  );
}

export default page;
