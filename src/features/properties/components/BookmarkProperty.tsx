import { bookmarkProperty } from "@/actions/properties";
import { cn } from "@/lib/utils";
import { CiBookmark } from "react-icons/ci";

function BookmarkProperty({
  propertyId,
  className,
}: {
  propertyId: string;
  className?: string;
}) {
  const bookmarkPropertyWithId = bookmarkProperty.bind(null, propertyId);
  return (
    <form action={bookmarkPropertyWithId}>
      <button
        className={cn(
          "flex size-12 items-center justify-center rounded-lg border border-gray-300 bg-bgDark shadow-md transition-all hover:border-alt hover:bg-alt hover:text-white",
          className,
        )}
      >
        <CiBookmark className="text-4xl" />
      </button>
    </form>
  );
}

export default BookmarkProperty;
