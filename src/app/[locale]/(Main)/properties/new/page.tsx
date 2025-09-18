import { getDictionary } from "@/app/[locale]/dictionaries";
import { auth } from "@/auth";
import Spinner from "@/components/Spinner";
import SignoutWhenUserDeleted from "@/features/auth/components/SignoutWhenUserDeleted";
import CreatePropertyForm from "@/features/properties/components/CreatePropertyForm";
import { getUser } from "@/services/prismaApi";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Property",
};

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
    <section className="container pb-16 pt-8 font-poppins">
      <Suspense
        fallback={
          <div className="flex min-h-60 items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <CreatePropertyForm dictionary={dictionary} />
      </Suspense>
    </section>
  );
}

export default page;
