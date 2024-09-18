import Image from "next/image";
import loginImage from "../../../public/assets/login.jpg";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={` bg-bgLight relative`}>
      <main className="min-h-screen grid antialiased grid-cols-1 lg:grid-cols-2">
        {children}

        <Image
          src={loginImage}
          className="max-h-screen size-full min-h-[720px]  object-cover hidden lg:block"
          alt="hero"
        />
      </main>
    </div>
  );
}
