"use client";

import { NaverMap, useNaverMap } from "@/components/NaverMap";
import { useClientEffect } from "@/hooks";
import sizes from "@/styles/constants/sizes.module.scss";

const Map: React.FC = () => {
  const { load } = useNaverMap("location-page-naver-map");

  useClientEffect(() => {
    load({ center: { lat: 37.3595704, lng: 127.105399 } });
  }, [load]);

  return (
    <NaverMap
      id="location-page-naver-map"
      width="100%"
      height={`calc(100dvh - ${sizes.baseHeaderHeight} - ${sizes.locationCategoryHeight} - ${sizes.bottomNavigationHeight})`}
    />
  );
};

export default Map;
