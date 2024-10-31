import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/auth";

function GoogleBtn({ callbackUrl }: { callbackUrl?: string | undefined }) {
  return (
    <form
      action={async () => {
        "use server";

        await signIn("google", {
          redirectTo: callbackUrl || "/",
        });
      }}
      className="mt-12"
    >
      <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-stroke py-4">
        <FcGoogle className="size-8" />
        <p>Google</p>
      </button>
    </form>
  );
}

export default GoogleBtn;
