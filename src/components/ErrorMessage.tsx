import { MdErrorOutline } from "react-icons/md";
import BackButton from "./BackButton";

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="container my-4 flex min-h-32 flex-col items-center justify-center gap-4 rounded-lg bg-bgDark font-poppins">
      <div className="flex items-center gap-1">
        <MdErrorOutline className="size-5 text-red-500" />
        <p className="font-poppins text-lg font-medium">{message}</p>
      </div>
      <BackButton
        text="Back"
        href="/"
        className="mr-0 text-sm"
        iconStyle="size-4"
      />
    </div>
  );
}

export default ErrorMessage;
