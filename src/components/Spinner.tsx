import { cn } from "@/lib/utils";
import { FaSpinner } from "react-icons/fa6";

function Spinner({ className }: { className?: string }) {
  return (
    <FaSpinner className={cn("animate-spin text-4xl text-main", className)} />
  );
}

export default Spinner;
