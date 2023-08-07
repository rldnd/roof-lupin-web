import { useMemo } from "react";

import { useAtomValue } from "jotai";

import { platformState } from "@/states";
import { isClient } from "@/utils/next";

interface ReturnUsePlatform {
  isIosWebview: boolean;
  isAndroidWebview: boolean;
  isWebview: boolean;
  isMobile: boolean;
  isPc: boolean;
}

const usePlatform = (): ReturnUsePlatform => {
  const platform = useAtomValue(platformState);

  const isIosWebview = useMemo<boolean>(() => platform === "ios", [platform]);
  const isAndroidWebview = useMemo<boolean>(() => platform === "android", [platform]);
  const isWebview = useMemo<boolean>(() => isIosWebview || isAndroidWebview, [isAndroidWebview, isIosWebview]);
  const isMobile = useMemo<boolean>(
    () =>
      isClient
        ? !isWebview && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        : false,
    [isWebview],
  );
  const isPc = useMemo<boolean>(() => !isWebview && !isMobile, [isMobile, isWebview]);

  return {
    isIosWebview,
    isAndroidWebview,
    isWebview,
    isMobile,
    isPc,
  };
};

export default usePlatform;
