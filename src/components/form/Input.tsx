import { cn } from "@/lib/utils";

export default function Input({
  name,
  placeholder,
  className,
  register,
  dir,
}: {
  name: string;
  placeholder: string;
  className?: string;
  register?: any;
  dir?: string;
}) {
  return (
    <input
      dir={dir}
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
