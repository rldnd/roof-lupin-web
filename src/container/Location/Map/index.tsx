"use client";

import { useUnmount } from "react-use";

import { LOCATION_PAGE_MAP_ID } from "@/common/constants";
import { NaverMap, useNaverMap } from "@/components/NaverMap";
import { useClientEffect } from "@/hooks";
import sizes from "@/styles/constants/sizes.module.scss";

const Map: React.FC = () => {
  const { load, destroy } = useNaverMap(LOCATION_PAGE_MAP_ID);

  useClientEffect(() => {
    load({ center: { lat: 37.3595704, lng: 127.105399 }, zoom: 16 });
  }, [load]);

  useUnmount(() => {
    destroy();
  });

  return (
    <NaverMap
      id={LOCATION_PAGE_MAP_ID}
      width="100%"
      height={`calc(100dvh - ${sizes.baseHeaderHeight} - ${sizes.locationCategoryHeight} - ${sizes.bottomNavigationHeight})`}
    />
  );
};

export default Map;
