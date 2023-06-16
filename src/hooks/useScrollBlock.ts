import { useCallback } from "react";

import { isClient } from "@/utils/next";

interface ReturnUseScrollBlock {
  block(): void;
  unBlock(): void;
}

const useScrollBlock = (): ReturnUseScrollBlock => {
  const block = useCallback(() => {
    if (!isClient) return;

    const body = document.getElementsByTagName("body")[0];
    if (body) body.style.overflow = "hidden";
  }, []);

  const unBlock = useCallback(() => {
    if (!isClient) return;

    const body = document.getElementsByTagName("body")[0];
    if (body) body.style.overflow = "visible";
  }, []);

  return {
    block,
    unBlock,
  };
};

export default useScrollBlock;
