"use client";

import { useSetAtom } from "jotai";

import type { AppCommonPlatformPayload } from "@/common/types/webview/common";
import { useClientEffect, useWebview } from "@/hooks";
import { platformState } from "@/states/platform";

const PlatformChecker: React.FC = () => {
  const setPlatform = useSetAtom(platformState);
  const { addListener, removeListener } = useWebview();

  useClientEffect(() => {
    addListener<AppCommonPlatformPayload>("app-common/platform", ({ platform }) => {
      setPlatform(platform);
    });

    return () => {
      removeListener<AppCommonPlatformPayload>("app-common/platform");
    };
  }, [addListener, removeListener, setPlatform]);

  return null;
};

export default PlatformChecker;
