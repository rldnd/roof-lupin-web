"use client";

import { useLayoutEffect, useRef } from "react";

import { MAP_LOADED_EVENT_NAME } from "@/common/constants";
import { useClientEffect } from "@/hooks";
import sizes from "@/styles/constants/sizes.module.scss";
import { loadNaverMapScript } from "@/utils/naverMap";
import { isClient } from "@/utils/next";

const Map: React.FC = () => {
  const naverMapScript = useRef<HTMLScriptElement>();
  const mapDivRef = useRef<HTMLDivElement>(null);
  const map = useRef<naver.maps.Map>();

  useLayoutEffect(() => {
    if (!isClient) return;
    naverMapScript.current = loadNaverMapScript();
    naverMapScript.current.onload = () => {
      window.dispatchEvent(new CustomEvent(MAP_LOADED_EVENT_NAME));
    };
  }, []);

  useClientEffect(() => {
    if (!mapDivRef.current) return;

    const mapInit = () => {
      map.current = new naver.maps.Map(mapDivRef.current!, { zoom: 5 });
    };

    window.addEventListener(MAP_LOADED_EVENT_NAME, mapInit);
    return () => {
      window.removeEventListener(MAP_LOADED_EVENT_NAME, mapInit);
    };
  }, []);

  return (
    <div
      id="location-page-naver-map"
      ref={mapDivRef}
      style={{
        width: "100%",
        height: `calc(100dvh - ${sizes.baseHeaderHeight} - ${sizes.locationCategoryHeight} - ${sizes.bottomNavigationHeight})`,
      }}
    />
  );
};

export default Map;
