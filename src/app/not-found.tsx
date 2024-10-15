import NavBar from "@/components/layout/NavBar";
import notFoundImage from "../../public/assets/404-page.png";
import Image from "next/image";
import BackButton from "@/components/BackButton";

function notFound() {
  return (
    <div className={` bg-bgLight relative `}>
      <NavBar />
      <main className="md:min-h-[calc(100vh-104px)] min-h-[calc(100vh-80px)] grid font-playfair antialiased">
        <div className="container flex flex-col justify-center items-center">
          <Image
            src={notFoundImage}
            alt="hero"
            className="  object-cover "
            width={400}
            height={200}
          />
          <div className="font-poppins flex flex-col items-center  gap-2 ">
            <p className="lg:text-3xl text-xl mt-5 capitalize font-medium text-center">
              the page you are looking for was not found
            </p>
            <BackButton
              text="Back to Properties"
              className="capitalize lg:text-xl text-base"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default notFound;
