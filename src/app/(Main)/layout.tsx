import Transition from "@/components/Transition";
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
      <main className="grid min-h-[calc(100vh-80px)] font-playfair antialiased md:min-h-[calc(100vh-104px)]">
        <Transition>{children}</Transition>
      </main>
      <Footer />
    </div>
  );
}
