import Logo from "@/components/Logo";
import { Metadata } from "next";
import CredentialForm from "./CredentialForm";
import GoogleBtn from "./GoogleBtn";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

type Props = {
  searchParams: Promise<{
    callbackUrl: string | undefined;
  }>;
};

async function page(props: Props) {
  const searchParams = await props.searchParams;

  const {
    callbackUrl
  } = searchParams;

  return (
    <div className="font-poppins bg-bgLight p-14 flex flex-col justify-center items-center">
      <div className="max-w-[600px] w-full">
        <Logo />

        <h1 className={`text-3xl mt-5 capitalize font-semibold  `}>
          Login to your account
        </h1>

        <GoogleBtn callbackUrl={callbackUrl} />

        <div className="my-5 relative flex">
          <p className="w-fit text-font capitalize z-10 relative mx-auto bg-bgLight px-2">
            or continue with email
          </p>
          <span className="absolute  top-1/2 -translate-y-1/2 h-[2px] left-0 w-full bg-stroke"></span>
        </div>

        <CredentialForm callbackUrl={callbackUrl} />

        <div className="flex w-full justify-center gap-2">
          <p className="capitalize">don&apos;t have an account?</p>
          <Link className="text-main hover:underline" href="/signup">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
