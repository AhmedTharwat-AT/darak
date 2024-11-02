import { Metadata } from "next";
import Link from "next/link";

import Logo from "@/components/Logo";
import LoginForm from "@/features/auth/components/LoginForm";
import GoogleBtn from "@/features/auth/components/GoogleBtn";

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

  const { callbackUrl } = searchParams;

  return (
    <div className="flex flex-col items-center justify-center bg-bgLight p-14 font-poppins">
      <div className="w-full max-w-[600px]">
        <Logo />

        <h1 className={`mt-5 text-3xl font-semibold capitalize`}>
          Login to your account
        </h1>

        <GoogleBtn callbackUrl={callbackUrl} />

        <div className="relative my-5 flex">
          <p className="relative z-10 mx-auto w-fit bg-bgLight px-2 capitalize text-font">
            or continue with email
          </p>
          <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-stroke"></span>
        </div>

        <LoginForm callbackUrl={callbackUrl} />

        <div className="mt-6 flex w-full justify-center gap-2">
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
