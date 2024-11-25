import { auth } from "@/auth";
import SignoutWhenUserDeleted from "@/features/auth/components/SignoutWhenUserDeleted";
import UserInfo from "@/features/profile/components/UserInfo";
import { UserWithProperties } from "@/lib/types";
import { getUser } from "@/services/prismaApi";
import { redirect } from "next/navigation";
import { getDictionary } from "../../dictionaries";

async function page({ params }: { params: Promise<{ locale: string }> }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/en/signin?callbackUrl=/en/profile");
  }

  const user: UserWithProperties = await getUser(session.user.email);
  if (!user) {
    return <SignoutWhenUserDeleted />;
  }

  const locale = (await params).locale;
  const dictionary = await getDictionary(locale);

  return (
    <div>
      <h1 className="text-2xl font-semibold">
        {dictionary.profile.account.title}
      </h1>
      <UserInfo user={user} dictionary={dictionary} />
      {/* <h1 className="text-2xl font-semibold">Passwords</h1>
      <UserPasswords user={user} /> */}
    </div>
  );
}

export default page;
