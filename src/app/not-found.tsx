import notFoundImage from "@/assets/illustrations/notfound.png";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import Footer from "@/components/layout/Footer";
import { AnimationProvider } from "@/context/AnimationProvider";
import { Metadata } from "next";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Page not found ",
};

function notFound() {
  return (
    <html>
      <body>
        <AnimationProvider>
          <div className={`relative bg-bgLight`}>
            <header className="relative z-10 pt-8 lg:pt-14">
              <div className="container">
                <nav className="flex h-12 justify-between border-b border-stroke pb-2 font-poppins">
                  <Logo />
                </nav>
              </div>
            </header>

            <main className="grid min-h-[calc(100vh-144px)] py-6 font-playfair antialiased lg:min-h-[calc(100vh-168px)]">
              <div className="container flex flex-col items-center justify-center">
                <Image
                  src={notFoundImage}
                  alt="hero"
                  className="object-cover"
                  width={400}
                  height={200}
                />
                <div className="flex flex-col items-center gap-2 font-poppins">
                  <p className="mb-2 mt-5 text-center text-xl font-medium capitalize lg:text-2xl">
                    the page you are looking for was not found
                  </p>
                  <BackButton
                    text="Back to Home"
                    className="text-base capitalize lg:text-xl"
                    href="/"
                  />
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </AnimationProvider>
      </body>
    </html>
  );
}

export default notFound;
