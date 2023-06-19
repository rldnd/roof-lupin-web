import { useCallback } from "react";

import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import { isClient } from "@/utils/next";

interface ReturnUseScrollBlock {
  block(): void;
  unBlock(): void;
}

const useScrollBlock = (): ReturnUseScrollBlock => {
  const block = useCallback(() => {
    if (!isClient) return;

    const body = document.getElementsByTagName("body")[0];
    disableBodyScroll(body);
  }, []);

  const unBlock = useCallback(() => {
    if (!isClient) return;

    const body = document.getElementsByTagName("body")[0];
    enableBodyScroll(body);
  }, []);

  return {
    block,
    unBlock,
  };
};

export default useScrollBlock;
