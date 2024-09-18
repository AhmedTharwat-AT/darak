import { FaLock } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { signIn } from "../../../../auth";
import { Button } from "@/components/ui/button";

function CredentialForm({ callbackUrl }: { callbackUrl?: string | undefined }) {
  return (
    <form
      action={async (data) => {
        "use server";

        const email = data.get("email");
        const password = data.get("password");
        await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: callbackUrl || "/",
        });
      }}
    >
      <div className="mb-6">
        <label className="block mb-2">Email</label>
        <div className="relative">
          <IoMdMail className="absolute top-1/2 -translate-y-1/2 left-3 size-5 fill-stroke" />
          <input
            className="w-full focus:border-main  ps-10 pe-4 py-4 border border-stroke rounded-lg"
            name="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2">Password</label>
        <div className="relative">
          <FaLock className="absolute top-1/2 -translate-y-1/2 left-3 size-5 fill-stroke" />
          <input
            className="w-full ps-10 focus:border-main pe-4 py-4 border border-stroke rounded-lg"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
      </div>
      {/* <input name="csrfToken" type="hidden" defaultValue={csrf} /> */}
      <Button className="w-full text-xl my-6 py-4 h-auto" size="lg">
        Login
      </Button>
    </form>
  );
}

export default CredentialForm;
