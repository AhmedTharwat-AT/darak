import { cn } from "@/lib/utils";

export default function Input({
  name,
  placeholder,
  className,
  register,
}: {
  name: string;
  placeholder: string;
  className?: string;
  register?: any;
}) {
  return (
    <input
      type="text"
      id={name}
      name={name}
      placeholder={placeholder}
      className={cn(
        "w-full border px-2 py-2 placeholder:capitalize",
        className,
      )}
      {...register?.(name)}
    />
  );
}
