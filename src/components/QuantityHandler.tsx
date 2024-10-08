function QuantityHandler({
  value,
  handler,
}: {
  value: number;
  handler: (value: number) => void;
}) {
  return (
    <div className="flex gap-1 rounded-lg overflow-hidden">
      <input
        type="number"
        name="rooms"
        id="rooms"
        value={value}
        className="w-full px-3 appearance-none"
        onWheel={(e) => e.currentTarget.blur()}
        placeholder="Rooms"
        onChange={(e) => handler(Number(e.target.value))}
      />
      <button
        onClick={() => handler(value - 1)}
        className="size-9 shrink-0 bg-font text-white hover:text-white hover:bg-main "
      >
        <span className="text-3xl leading-7">-</span>
      </button>

      <button
        onClick={() => handler(value + 1)}
        className="size-9 shrink-0 bg-font text-white hover:text-white hover:bg-main"
      >
        <span className="text-3xl leading-7">+</span>
      </button>
    </div>
  );
}

export default QuantityHandler;
