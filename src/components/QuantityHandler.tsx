"use client";

import { cn } from "@/lib/utils";

function QuantityHandler({
  name,
  value,
  handler,
  className,
  btnClassName,
  register,
  setValue,
}: {
  name: string;
  value: number | string;
  handler: (value: any) => void;
  className?: string;
  btnClassName?: string;
  register?: any;
  setValue?: any;
}) {
  // const quantityType = String(value);
  return (
    <div className={cn("flex gap-1 overflow-hidden rounded-lg", className)}>
      <input
        type="number"
        name={name}
        id={name}
        className="w-full appearance-none px-3"
        onWheel={(e) => e.currentTarget.blur()}
        placeholder={String(value)}
        {...register?.(name)}
        value={value}
        onChange={(e) => {
          console.log(name, e.target.value);
          handler(e.target.value);
        }}
      />
      <QuantityBtn
        onClick={() => {
          handler(Number(value) - 1);
          setValue?.(name, Number(value) - 1);
        }}
        increase={false}
        className={btnClassName}
      />
      <QuantityBtn
        onClick={() => {
          handler(Number(value) + 1);
          setValue?.(name, Number(value) + 1);
        }}
        increase={true}
        className={btnClassName}
      />
    </div>
  );
}

function QuantityBtn({
  onClick,
  increase,
  className,
}: {
  onClick: () => void;
  increase: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={cn(
        "flex size-9 h-full shrink-0 items-center justify-center bg-font text-white hover:bg-main hover:text-white",
        className,
      )}
    >
      <span className="text-3xl">{increase ? "+" : "-"}</span>
    </button>
  );
}

export default QuantityHandler;
