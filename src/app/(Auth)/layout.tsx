import Image from "next/image";
import loginImage from "@/assets/login.jpg";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`relative bg-bgLight`}>
      <main className="grid min-h-screen grid-cols-1 antialiased lg:grid-cols-2">
        {children}

        <Image
          src={loginImage}
          className="hidden size-full max-h-screen min-h-[720px] object-cover lg:block"
          alt="hero"
        />
      </main>
    </div>
  );
}
