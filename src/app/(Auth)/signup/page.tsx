import { Metadata } from "next";
import Link from "next/link";

import Logo from "@/components/Logo";
import CredentialForm from "@/features/auth/components/CredentialForm";
import GoogleBtn from "@/features/auth/components/GoogleBtn";

export const metadata: Metadata = {
  title: "Signup",
};

type Props = {
  searchParams: Promise<{
    callbackUrl: string | undefined;
  }>;
};

async function page(props: Props) {
  const searchParams = await props.searchParams;

  const { callbackUrl } = searchParams;

  return (
    <div className="font-poppins bg-bgLight p-14 flex flex-col justify-center items-center">
      <div className="max-w-[600px] w-full">
        <Logo />

        <h1 className={`text-3xl mt-5 capitalize font-semibold  `}>
          Create new account
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
          <p className="capitalize">already have an account?</p>
          <Link className="text-main hover:underline" href="/signin">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
