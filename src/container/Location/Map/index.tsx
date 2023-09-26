"use client";

import { useUnmount } from "react-use";

import { INITIAL_LOCATION, LOCATION_PAGE_MAP_ID } from "@/common/constants";
import { NaverMap, useNaverMap } from "@/components/NaverMap";
import { useClientEffect } from "@/hooks";
import sizes from "@/styles/constants/sizes.module.scss";

const Map: React.FC = () => {
  const { load, destroy } = useNaverMap(LOCATION_PAGE_MAP_ID);

  useClientEffect(() => {
    const { lat, lng } = INITIAL_LOCATION;
    load({ options: { center: { lat: Number(lat), lng: Number(lng) }, zoom: 16 }, restorePosition: true });
  }, [load]);

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
