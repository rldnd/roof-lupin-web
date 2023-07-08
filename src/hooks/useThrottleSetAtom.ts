import { useMemo } from "react";

import { type PrimitiveAtom, useSetAtom } from "jotai";
import { type DebouncedFunc, throttle, type ThrottleSettings } from "lodash-es";

interface WithInitialValue<T> {
  init: T;
}

const useThrottleSetAtom = <T>(
  atom: PrimitiveAtom<T> & WithInitialValue<T>,
  delay = 500,
  options?: ThrottleSettings,
) => {
  const setAtom = useSetAtom(atom);

  return useMemo<DebouncedFunc<typeof setAtom>>(
    () => throttle(setAtom, delay, options ?? { leading: false, trailing: true }),
    [options, setAtom, delay],
  );
};

export default useThrottleSetAtom;
