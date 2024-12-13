import { auth } from "@/auth";
import { getDictionary } from "../../dictionaries";
import { getUser } from "@/services/prismaApi";
import { redirect } from "next/navigation";
import { UserWithProperties } from "@/lib/types";

import SignoutWhenUserDeleted from "@/features/auth/components/SignoutWhenUserDeleted";
import UserInfo from "@/features/profile/components/UserInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

async function page({ params }: { params: Promise<{ locale: string }> }) {
  const session = await auth();
  const locale = (await params).locale;

  if (!session?.user) {
    redirect(`/${locale}/signin?callbackUrl=/${locale}/profile`);
  }

  const user: UserWithProperties = await getUser(session.user.email);
  if (!user) {
    return <SignoutWhenUserDeleted />;
  }

  const dictionary = await getDictionary(locale);

  return (
    <section>
      <h1 className="text-2xl font-semibold">
        {dictionary.profile.account.title}
      </h1>
      <UserInfo user={user} dictionary={dictionary} />
    </section>
  );
}

export default page;
