import Image from "next/image";
import loginImage from "@/assets/login.jpg";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div dir="ltr" className={`relative bg-bgLight`}>
      <main className="grid min-h-screen grid-cols-1 antialiased lg:grid-cols-2">
        {children}

        <Image
          src={loginImage}
          className="hidden size-full min-h-[720px] object-cover object-center lg:block"
          alt="hero"
        />
      </main>
    </div>
  );
}
