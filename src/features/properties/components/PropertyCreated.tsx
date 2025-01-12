import BackButton from "@/components/BackButton";
import messageImage from "@/assets/illustrations/message.png";
import Image from "next/image";

function PropertyCreated() {
  return (
    <div
      ref={(ref) => {
        ref?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
      className="flex flex-col items-center justify-center gap-4 text-center font-poppins"
    >
      <h1 className="text-xl sm:text-2xl">We&apos;ve Received Your Request!</h1>

      <p className="max-w-[600px] text-sm sm:text-base">
        Thank you for uploading your property! It is now under review. You can
        expect a response within the next 5 days.
      </p>

      <Image
        src={messageImage}
        alt="message"
        width={400}
        height={200}
        className="max-sm:w-[300px]"
      />
      <BackButton
        className="mr-0 text-sm sm:text-base"
        iconStyle="size-3 sm:size-4"
        text="View your properties"
        href="/profile/listings"
      />
    </div>
  );
}

export default PropertyCreated;
