import { cn } from "@/lib/utils";

function ErrorField({
  message,
  className,
}: {
  message: string | undefined;
  className?: string;
}) {
  if (!message) return null;
  return <p className={cn("text-red-500", className)}>{message}</p>;
}

export default ErrorField;
