import { FaLock } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

function CredentialForm({ callbackUrl }: { callbackUrl?: string | undefined }) {
  return (
    <form
      action={async (data) => {
        "use server";

        const email = data.get("email");
        const password = data.get("password");
        console.log("cbb", callbackUrl);
        await signIn("credentials", {
          email,
          password,
          redirectTo: callbackUrl || "/",
        });
      }}
    >
      <div className="mb-6">
        <label className="mb-2 block">Email</label>
        <div className="relative">
          <IoMdMail className="absolute left-3 top-1/2 size-5 -translate-y-1/2 fill-stroke" />
          <input
            className="w-full rounded-lg border border-stroke py-4 pe-4 ps-10 focus:border-main"
            name="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block">Password</label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 size-5 -translate-y-1/2 fill-stroke" />
          <input
            className="w-full rounded-lg border border-stroke py-4 pe-4 ps-10 focus:border-main"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
      </div>
      {/* <input name="csrfToken" type="hidden" defaultValue={csrf} /> */}
      <Button className="my-6 h-auto w-full py-4 text-xl" size="lg">
        Login
      </Button>
    </form>
  );
}

export default CredentialForm;
