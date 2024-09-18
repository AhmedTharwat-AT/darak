import { FcGoogle } from "react-icons/fc";
import { signIn } from "../../../../auth";

function GoogleBtn({ callbackUrl }: { callbackUrl?: string | undefined }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", {
          redirect: true,
          callbackUrl: callbackUrl || "/",
        });
      }}
      className=" mt-12 "
    >
      <button className="flex rounded-lg  w-full items-center gap-2 border justify-center py-4 border-stroke">
        <FcGoogle className="size-8" />
        <p>Google</p>
      </button>
    </form>
  );
}

export default GoogleBtn;
