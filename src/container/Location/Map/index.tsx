"use client";

import { useEffect } from "react";

import { useAtomValue } from "jotai";
import { useUnmount } from "react-use";

import { INITIAL_LOCATION, INITIAL_ZOOM, LOCATION_PAGE_MAP_ID } from "@/common/constants";
import { NaverMap, useNaverMap } from "@/components/NaverMap";
import { hasInitNaverMapEventEmitter } from "@/states";
import sizes from "@/styles/constants/sizes.module.scss";

// TODO: 앱에서 위치 받아오는 방식
const Map: React.FC = () => {
  const hasInit = useAtomValue(hasInitNaverMapEventEmitter);
  const { load, destroy } = useNaverMap(LOCATION_PAGE_MAP_ID);

  useEffect(() => {
    if (!(LOCATION_PAGE_MAP_ID in hasInit) || !hasInit[LOCATION_PAGE_MAP_ID]) return;
    const { lat, lng } = INITIAL_LOCATION;
    load({ options: { center: { lat: Number(lat), lng: Number(lng) }, zoom: INITIAL_ZOOM }, restorePosition: true });
  }, [load, hasInit]);

  useUnmount(() => {
    destroy();
  });

  return (
    <NaverMap
      id={LOCATION_PAGE_MAP_ID}
      width="100%"
      height={`calc(100vh - ${sizes.baseHeaderHeight} - ${sizes.locationCategoryHeight} - ${sizes.bottomNavigationHeight})`}
    />
  );
};

export default Map;
