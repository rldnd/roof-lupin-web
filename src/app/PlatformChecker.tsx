"use client";

import { useEffect } from "react";

import { useSearchParams } from "next/navigation";

import { useSetAtom } from "jotai";

import { type Platform, PLATFORMS, platformState } from "@/states";

const PlatformChecker: React.FC = () => {
  const setPlatform = useSetAtom(platformState);
  const { get } = useSearchParams();
  const [isApp, platform] = [get("roofLupinApp"), get("platform")];

  useEffect(() => {
    if (isApp && platform && PLATFORMS.includes(platform)) {
      setPlatform(platform as Platform);
      // NOTE: 웹뷰인 경우 배경색을 흰색으로 변경
      const $background = document.getElementById("layout-background");
      $background!.style.backgroundColor = "#ffffff";
    }
  }, [isApp, platform, setPlatform]);

  return null;
};

export default PlatformChecker;
