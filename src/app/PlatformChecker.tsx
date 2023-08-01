"use client";

import { useEffect } from "react";

import { useSearchParams } from "next/navigation";

import { useSetAtom } from "jotai";

import { type Platform, PLATFORMS, platformState } from "@/states/platform";

const PlatformChecker: React.FC = () => {
  const setPlatform = useSetAtom(platformState);
  const { get } = useSearchParams();
  const [isApp, platform] = [get("roofLupinApp"), get("platform")];

  useEffect(() => {
    if (isApp && platform && PLATFORMS.includes(platform)) setPlatform(platform as Platform);
  }, [isApp, platform, setPlatform]);

  return null;
};

export default PlatformChecker;
