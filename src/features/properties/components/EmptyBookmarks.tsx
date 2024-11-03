import emptyBookmarks from "@/assets/illustrations/empty-saved.jpg";
import BackButton from "@/components/BackButton";
import Image from "next/image";

function EmptyBookmarks() {
  return (
    <main className="my-8 grid min-h-[calc(100vh-80px)] font-playfair antialiased md:min-h-[calc(100vh-104px)]">
      <div className="container flex flex-col items-center justify-center">
        <Image
          src={emptyBookmarks}
          alt="bookmarks"
          className="object-cover"
          width={400}
          height={200}
        />
        <div className="flex flex-col items-center gap-2 font-poppins">
          <p className="mb-2 mt-5 text-center text-xl font-medium capitalize lg:text-2xl">
            Start exploring and bookmark your favorites!
          </p>
          <BackButton
            text="Back to Properties"
            className="text-base capitalize lg:text-xl"
          />
        </div>
      </div>
    </main>
  );
}

export default EmptyBookmarks;
