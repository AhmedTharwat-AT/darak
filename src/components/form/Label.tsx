import { cn } from "@/lib/utils";

function Label({ name, className }: { name: string; className?: string }) {
  return (
    <label
      htmlFor={name}
      className={cn("mb-2 block w-full capitalize", className)}
    >
      {name}
    </label>
  );
}

export default Label;
