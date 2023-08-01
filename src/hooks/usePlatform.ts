import { useMemo } from "react";

import { useAtomValue } from "jotai";

import { platformState } from "@/states/platform";
import { isClient } from "@/utils/next";

interface ReturnUsePlatform {
  isIosWebview: boolean;
  isAndroidWebview: boolean;
  isWebview: boolean;
  isMobile: boolean;
}

const usePlatform = (): ReturnUsePlatform => {
  const platform = useAtomValue(platformState);

  const isIosWebview = useMemo<boolean>(() => platform === "ios", [platform]);
  const isAndroidWebview = useMemo<boolean>(() => platform === "android", [platform]);
  const isWebview = useMemo<boolean>(() => isIosWebview || isAndroidWebview, [isAndroidWebview, isIosWebview]);

  return {
    isIosWebview,
    isAndroidWebview,
    isWebview,
    isMobile: isClient
      ? !isWebview && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      : false,
  };
};

export default usePlatform;
