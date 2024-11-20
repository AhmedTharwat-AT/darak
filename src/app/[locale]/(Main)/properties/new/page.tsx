import { auth } from "@/auth";
import Spinner from "@/components/Spinner";
import SignoutWhenUserDeleted from "@/features/auth/components/SignoutWhenUserDeleted";
import CreatePropertyForm from "@/features/properties/components/CreatePropertyForm";
import { getUser } from "@/services/prismaApi";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/en/signin?callbackUrl=/en/properties/new");
  }

  const user = await getUser(session?.user?.email || "");
  if (!user) {
    return <SignoutWhenUserDeleted />;
  }

  return (
    <div className="container pb-16 pt-8 font-poppins">
      <h1 className="pb-6 text-center text-2xl font-semibold capitalize text-black">
        Create new property
      </h1>
      <Suspense
        fallback={
          <div className="flex min-h-60 items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <CreatePropertyForm />
      </Suspense>
    </div>
  );
}

export default page;
