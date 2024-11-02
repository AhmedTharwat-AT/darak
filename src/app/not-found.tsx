import NavBar from "@/components/layout/NavBar";
import notFoundImage from "@/assets/404-page.png";
import Image from "next/image";
import BackButton from "@/components/BackButton";

function notFound() {
  return (
    <div className={`relative bg-bgLight`}>
      <NavBar />
      <main className="grid min-h-[calc(100vh-80px)] font-playfair antialiased md:min-h-[calc(100vh-104px)]">
        <div className="container flex flex-col items-center justify-center">
          <Image
            src={notFoundImage}
            alt="hero"
            className="object-cover"
            width={400}
            height={200}
          />
          <div className="flex flex-col items-center gap-2 font-poppins">
            <p className="mt-5 text-center text-xl font-medium capitalize lg:text-3xl">
              the page you are looking for was not found
            </p>
            <BackButton
              text="Back to Properties"
              className="text-base capitalize lg:text-xl"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default notFound;
