import emptyBookmarks from "@/assets/illustrations/empty-saved.jpg";
import BackButton from "@/components/BackButton";
import Image from "next/image";

function EmptyBookmarks() {
  return (
    <div className="container flex h-full flex-col items-center justify-center py-8 font-playfair antialiased">
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
          className="mr-0 text-base capitalize lg:text-xl"
        />
      </div>
    </div>
  );
}

export default EmptyBookmarks;
