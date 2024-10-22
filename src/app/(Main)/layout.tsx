import Transition from "@/components/Transition";
import NavBar from "@/components/layout/NavBar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div key="main layout" className={` bg-bgLight relative `}>
      <NavBar />
      <main className="md:min-h-[calc(100vh-104px)] min-h-[calc(100vh-80px)] grid font-playfair antialiased">
        <Transition>{children}</Transition>
      </main>
    </div>
  );
}
