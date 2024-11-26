import { cn } from "@/lib/utils";

function Label({
  name,
  className,
  id,
}: {
  name: string;
  className?: string;
  id?: string;
}) {
  return (
    <label
      htmlFor={id || name}
      className={cn("mb-2 block w-full capitalize", className)}
    >
      {name}
    </label>
  );
}

export default Label;
