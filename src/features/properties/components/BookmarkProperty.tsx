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
          "flex size-12 items-center justify-center rounded-lg bg-bgDark",
          className,
        )}
      >
        <CiBookmark className="text-4xl" />
      </button>
    </form>
  );
}

export default BookmarkProperty;
