import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin?callbackUrl=/profile");
  }

  return <div>profile page</div>;
}

export default page;
