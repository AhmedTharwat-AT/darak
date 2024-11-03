import Image from "next/image";
import forSale from "@/assets/illustrations/for-sale.jpg";
import BackButton from "@/components/BackButton";

function EmptyListing() {
  return (
    <div className="container my-8 flex h-full flex-col items-center font-playfair antialiased">
      <Image
        src={forSale}
        alt="bookmarks"
        className="object-cover"
        width={400}
        height={200}
      />
      <div className="flex flex-col items-center gap-2 font-poppins">
        <p className="mb-2 mt-5 text-center text-lg font-medium capitalize lg:text-xl">
          You haven&apos;t added any properties for sale yet.
        </p>
        <BackButton
          text="Publish Your First Ad"
          className="text-base capitalize"
        />
      </div>
    </div>
  );
}

export default EmptyListing;
