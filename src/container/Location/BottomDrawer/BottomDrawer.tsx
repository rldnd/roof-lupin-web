"use client";

import { lazy, useEffect, useRef } from "react";

import { useAtomValue } from "jotai";
import { type BottomSheetRef } from "react-spring-bottom-sheet";

import { LOCATION_PAGE_MAP_ID } from "@/common/constants";
import { clickedMapMarkerState } from "@/states";
import sizes from "@/styles/constants/sizes.module.scss";
import { getNumberFromPixel } from "@/utils/styles";

import SpaceList from "./SpaceList";

import styles from "./bottomDrawer.module.scss";

const BottomSheet = lazy(() => import("react-spring-bottom-sheet").then((module) => ({ default: module.BottomSheet })));

const MIN_SIZE = getNumberFromPixel(sizes.locationBottomDrawerMinHeight);
const ONE_CARD_SIZE = getNumberFromPixel(sizes.spaceLocationCardImageSize);
const HAS_ONE_CARD_SIZE = ONE_CARD_SIZE + MIN_SIZE;
const HAS_TWO_CARD_SIZE = ONE_CARD_SIZE * 2 + MIN_SIZE;
const MAX_SIZE = (maxHeight: number) =>
  maxHeight - getNumberFromPixel(sizes.baseHeaderHeight) - getNumberFromPixel(sizes.locationCategoryHeight) - 40;

const BottomDrawer: React.FC = () => {
  const sheetRef = useRef<BottomSheetRef>(null);
  const maxHeightRef = useRef(0);
  const clickedMapMarker = useAtomValue(clickedMapMarkerState);

  useEffect(() => {
    if (!(LOCATION_PAGE_MAP_ID in clickedMapMarker)) return;
    if (!clickedMapMarker[LOCATION_PAGE_MAP_ID] || clickedMapMarker[LOCATION_PAGE_MAP_ID].spaceId.length === 0) {
      sheetRef.current?.snapTo(MIN_SIZE);
      return;
    }

    const cardCount = clickedMapMarker[LOCATION_PAGE_MAP_ID].spaceId.length;
    if (cardCount === 1) sheetRef.current?.snapTo(HAS_ONE_CARD_SIZE);
    else if (cardCount === 2) sheetRef.current?.snapTo(HAS_TWO_CARD_SIZE);
    else sheetRef.current?.snapTo(MAX_SIZE(maxHeightRef.current));
  }, [clickedMapMarker]);

  // TODO: snap points 세팅
  // 0개 선택일 때에는 최소, 최대
  // 1개 선택일 때에는 1개 사이즈
  // 2개 선택일 때에는 최소 사이즈, 2개 사이즈
  // 3개 일때부턴 최소, 최대

  return (
    <BottomSheet
      open
      scrollLocking={false}
      skipInitialTransition
      ref={sheetRef}
      defaultSnap={MIN_SIZE}
      snapPoints={({ maxHeight }) => {
        maxHeightRef.current = maxHeight;
        return [MIN_SIZE, HAS_ONE_CARD_SIZE, HAS_TWO_CARD_SIZE, MAX_SIZE(maxHeight)];
      }}
      expandOnContentDrag
      blocking={false}
      className={styles.wrapper}
    >
      <SpaceList />
    </BottomSheet>
  );
};

export default BottomDrawer;
