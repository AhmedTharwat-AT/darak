import { cn } from "@/lib/utils";

function ErrorField({
  message,
  className,
  dir = "ltr",
}: {
  message: string | undefined;
  className?: string;
  dir?: string;
}) {
  if (!message) return null;
  return (
    <p dir={dir} className={cn("text-sm text-red-600", className)}>
      {message}
    </p>
  );
}

export default ErrorField;
