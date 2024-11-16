import { auth } from "@/auth";
import SignoutWhenUserDeleted from "@/features/auth/components/SignoutWhenUserDeleted";
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
    return <SignoutWhenUserDeleted />;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Account information</h1>
      <UserInfo user={user} />
      {/* <h1 className="text-2xl font-semibold">Passwords</h1>
      <UserPasswords user={user} /> */}
    </div>
  );
}

export default page;
