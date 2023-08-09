"use client";

import type { ComponentProps } from "react";

import { Range } from "react-range";

// TODO: style customize
type RequiredRangeProps = Pick<ComponentProps<typeof Range>, "values" | "onChange" | "renderThumb" | "renderTrack">;
type PartialRangeProps = Partial<
  Omit<ComponentProps<typeof Range>, "values" | "onChange" | "renderThumb" | "renderTrack">
>;
type RangeProps = RequiredRangeProps & PartialRangeProps;

interface Props extends RangeProps {}

const Slider: React.FC<Props> = ({ ...props }) => {
  return <Range {...props} />;
};

export default Slider;
