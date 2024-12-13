import Image from "next/image";
import loginImage from "@/assets/auth-page.jpg";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div dir="ltr" className={`relative bg-bgLight`}>
      <main className="grid min-h-screen grid-cols-1 antialiased lg:grid-cols-2">
        {children}

        <div className="relative size-full">
          <Image
            src={loginImage}
            fill
            className="size-full object-cover max-lg:hidden"
            alt="hero"
          />
        </div>
      </main>
    </div>
  );
}
