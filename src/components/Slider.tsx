import MultiRangeSlider from "multi-range-slider-react";
import "@/app/sliderStyles.css";
import { ReactNode } from "react";

function Slider({
  value,
  handler,
  min,
  max,
  step,
  render,
}: {
  value: { from: number; to: number };
  handler: (value: { from: number; to: number }) => void;
  min: number;
  max: number;
  step?: number;
  render?: (value: { from: number; to: number }) => ReactNode;
}) {
  const minValue = value.from >= min ? value.from : min;
  const maxValue =
    value.to >= max ? max : value.to < value.from ? value.from : value.to;

  return (
    <>
      {/* label */}
      {render && render({ from: minValue, to: maxValue })}

      <MultiRangeSlider
        min={min}
        max={max}
        baseClassName="multi-range"
        ruler={false}
        label={false}
        barInnerColor="var(--font)"
        barLeftColor="var(--bg-darker)"
        barRightColor="var(--bg-darker)"
        step={step || 5}
        stepOnly
        style={{
          border: "none",
          boxShadow: "none",
          paddingInline: "0",
        }}
        minValue={minValue}
        maxValue={maxValue}
        onChange={(e) => {
          handler({ from: e.minValue, to: e.maxValue });
        }}
      />
    </>
  );
}

export default Slider;
