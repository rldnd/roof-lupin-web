import { useMemo, useRef } from "react";

import { type DebouncedFunc, throttle } from "lodash-es";

const useThrottleCallback = <T extends unknown[]>(cb: (...args: T) => void, delay = 300) => {
  const cbRef = useRef(cb);
  cbRef.current = cb;

  return useMemo<DebouncedFunc<(...args: T) => void>>(
    () =>
      throttle((...args: T) => cbRef.current(...args), delay, {
        leading: true,
        trailing: false,
      }),
    [delay],
  );
};

export default useThrottleCallback;
