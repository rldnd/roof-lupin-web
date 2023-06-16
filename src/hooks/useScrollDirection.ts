import { useRef, useState } from "react";

import { useClientEffect, useWindowScroll } from "@/hooks";

export type Direction = "up" | "down" | "none";

type ReturnUseScrollDirection = Direction;

const useScrollDirection = (): ReturnUseScrollDirection => {
  const { y } = useWindowScroll();

  const beforeScrollY = useRef<number | null>(null);
  const [direction, setDirection] = useState<Direction>("none");

  useClientEffect(() => {
    if (y === 0) return;
    if (beforeScrollY.current === null) {
      beforeScrollY.current = y;
      return;
    }

    if (beforeScrollY.current < y) setDirection((prev) => (prev !== "down" ? "down" : prev));
    if (beforeScrollY.current > y) setDirection((prev) => (prev !== "up" ? "up" : prev));
    beforeScrollY.current = y;
  }, [y]);

  return direction;
};

export default useScrollDirection;
