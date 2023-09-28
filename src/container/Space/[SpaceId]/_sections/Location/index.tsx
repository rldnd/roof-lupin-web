"use client";

import { useEffect } from "react";

import { useAtomValue } from "jotai";

import { SPACE_PAGE_MAP_ID } from "@/common/constants";
import type { Location as LocationType } from "@/common/types/location";
import type { SpaceCategory, Transportation } from "@/common/types/space";
import { NaverMap } from "@/components/NaverMap";
import { useNaverMap } from "@/hooks";
import { hasInitNaverMapEventEmitterState } from "@/states";
import { getMapCategoryIconPath } from "@/utils/category";
import { getMapMarkerIconWithOrderNoSorting } from "@/utils/naverMap";

import styles from "./location.module.scss";

interface Props {
  categories: SpaceCategory[];
  location: LocationType;
  publicTransportations: Transportation[];
}

const Location: React.FC<Props> = ({ location, publicTransportations, categories }) => {
  const hasInit = useAtomValue(hasInitNaverMapEventEmitterState);
  const { load, addMarker } = useNaverMap(SPACE_PAGE_MAP_ID);

  useEffect(() => {
    if (!(SPACE_PAGE_MAP_ID in hasInit) || !hasInit[SPACE_PAGE_MAP_ID]) return;
    const { lat, lng } = location;
    const category = getMapMarkerIconWithOrderNoSorting(categories);

    load({
      options: {
        center: { lat: Number(lat), lng: Number(lng) },
        disableDoubleClickZoom: true,
        disableDoubleTapZoom: true,
        disableTwoFingerTapZoom: true,
        disableKineticPan: true,
        draggable: false,
        scrollWheel: false,
      },
      restorePosition: false,
      onLoad: () => {
        addMarker({
          icon: category ? getMapCategoryIconPath(category) : "",
          lat,
          lng,
          spaceId: [],
          replaceDuplicateLocation: true,
          orderNo: null,
        });
      },
    });
  }, [addMarker, categories, hasInit, load, location]);

  return (
    <section id="location-section" className={styles.wrapper}>
      <h2 className={styles.title}>지도</h2>
      <NaverMap width="100%" height="250px" id={SPACE_PAGE_MAP_ID} />
    </section>
  );
};

export default Location;

export const LoadingLocation: React.FC = () => {
  return null;
};
