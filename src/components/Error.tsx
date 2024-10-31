import { MdErrorOutline } from "react-icons/md";

function Error({ message }: { message: string }) {
  return (
    <div className="container my-4 flex min-h-32 items-center justify-center rounded-lg bg-bgDark">
      <div className="flex items-center gap-1">
        <MdErrorOutline className="size-5 text-red-500" />
        <p className="font-poppins text-lg font-medium capitalize">{message}</p>
      </div>
    </div>
  );
}

export default Error;
