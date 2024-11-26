import { getDictionary } from "@/app/[locale]/dictionaries";
import { auth } from "@/auth";
import Spinner from "@/components/Spinner";
import SignoutWhenUserDeleted from "@/features/auth/components/SignoutWhenUserDeleted";
import CreatePropertyForm from "@/features/properties/components/CreatePropertyForm";
import { getUser } from "@/services/prismaApi";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function page({ params }: { params: Promise<{ locale: string }> }) {
  const session = await auth();
  const locale = (await params).locale;

  if (!session?.user) {
    redirect(`/${locale}/signin?callbackUrl=/${locale}/properties/new`);
  }

  const user = await getUser(session?.user?.email || "");
  if (!user) {
    return <SignoutWhenUserDeleted />;
  }

  const dictionary = await getDictionary(locale);

  return (
    <div className="container pb-16 pt-8 font-poppins">
      <h1 className="pb-6 text-center text-2xl font-semibold capitalize text-black">
        {dictionary.property.new.header}
      </h1>
      <Suspense
        fallback={
          <div className="flex min-h-60 items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <CreatePropertyForm dictionary={dictionary} />
      </Suspense>
    </div>
  );
}

export default page;
