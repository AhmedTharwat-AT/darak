import Transition from "@/components/layout/Transition";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div key="main layout" className={`relative bg-bgLight`}>
      <NavBar />
      <main className="grid min-h-[calc(100vh-144px)] overflow-clip font-playfair antialiased lg:min-h-[calc(100vh-168px)]">
        <Transition>{children}</Transition>
      </main>
      <Footer />
    </div>
  );
}
