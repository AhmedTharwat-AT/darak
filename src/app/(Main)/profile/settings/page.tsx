import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin?callbackUrl=/profile/settings");
  }
  return <div>settings</div>;
}

export default page;
