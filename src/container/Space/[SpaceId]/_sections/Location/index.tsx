"use client";

import { useEffect } from "react";

import { useAtomValue } from "jotai";
import Skeleton from "react-loading-skeleton";

import { INITIAL_ZOOM, SPACE_PAGE_MAP_ID } from "@/common/constants";
import type { Location as LocationType } from "@/common/types/location";
import type { SpaceCategory, Transportation } from "@/common/types/space";
import { NaverMap } from "@/components/NaverMap";
import { useNaverMap, useToast } from "@/hooks";
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
  const { addToast } = useToast();
  const hasInit = useAtomValue(hasInitNaverMapEventEmitterState);
  const { load, addNonInteractionMarker } = useNaverMap(SPACE_PAGE_MAP_ID);
  const address = location?.roadAddress ?? location.jibunAddress;

  const onClickCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      addToast({ message: "주소를 복사하였습니다." });
    } catch (err) {
      addToast({ message: "주소 복사에 실패했습니다." });
    }
  };

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
        maxZoom: INITIAL_ZOOM,
        minZoom: INITIAL_ZOOM,
        scrollWheel: false,
      },
      restorePosition: false,
      onLoad: () => {
        addNonInteractionMarker({
          icon: category ? getMapCategoryIconPath(category) : "",
          lat,
          lng,
        });
      },
    });
  }, [addNonInteractionMarker, categories, hasInit, load, location]);

  return (
    <section id="location-section" className={styles.wrapper}>
      <h2 className={styles.title}>지도</h2>
      <NaverMap width="100%" height="250px" id={SPACE_PAGE_MAP_ID} />
      <div className={styles.infoWrapper}>
        <span className={styles.address}>{address}</span>
        <button type="button" className={styles.copyButton} onClick={onClickCopy}>
          주소복사
        </button>
        {publicTransportations.length > 0 && (
          <p className={styles.publicTransportation}>
            {publicTransportations[0].name} 도보 {publicTransportations[0].timeTaken}분
          </p>
        )}
      </div>
    </section>
  );
};

export default Location;

export const LoadingLocation: React.FC = () => {
  return (
    <section id="location-section" className={styles.wrapper}>
      <h2 className={styles.title}>지도</h2>
      <Skeleton width="100%" height={250} />
      <div className={styles.infoWrapper}>
        <Skeleton width={120} />
        <button type="button" className={styles.copyButton} disabled>
          주소복사
        </button>
        <Skeleton width={60} />
      </div>
    </section>
  );
};
