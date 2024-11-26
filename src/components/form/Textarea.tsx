import { cn } from "@/lib/utils";

export default function Textarea({
  name,
  placeholder,
  className,
  register,
  label,
}: {
  name: string;
  placeholder: string;
  className?: string;
  register?: any;
  label: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <label
        htmlFor={name}
        className="mb-1 block w-full font-medium capitalize"
      >
        {label || name}
      </label>
      <textarea
        {...register(name)}
        id={name}
        name={name}
        rows={4}
        placeholder={placeholder}
        className="w-full border px-2 py-2 placeholder:capitalize focus:outline-none"
      />
    </div>
  );
}
