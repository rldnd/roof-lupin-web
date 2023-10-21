"use client";

import { lazy, useEffect, useRef, useState } from "react";

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

const getSnapPoints = (markerCount: number, maxHeight: number) => {
  const maxSize = MAX_SIZE(maxHeight);
  if (markerCount === 0) return [MIN_SIZE, maxSize];
  if (markerCount === 1) return [HAS_ONE_CARD_SIZE];
  if (markerCount === 2) return [MIN_SIZE, HAS_TWO_CARD_SIZE];
  return [MIN_SIZE, maxSize];
};

const getSnapToPoint = (markerCount: number) => {
  if (markerCount === 0) return MIN_SIZE;
  if (markerCount === 1) return HAS_ONE_CARD_SIZE;
  if (markerCount === 2) return HAS_TWO_CARD_SIZE;
  return MIN_SIZE;
};

const BottomDrawer: React.FC = () => {
  const sheetRef = useRef<BottomSheetRef>(null);
  const [maxHeight, setMaxHeight] = useState(0);
  const clickedMapMarker = useAtomValue(clickedMapMarkerState);

  const [snapPoints, setSnapPoints] = useState<number[]>([MIN_SIZE]);

  const hasMap = LOCATION_PAGE_MAP_ID in clickedMapMarker;
  const hasClickedMarker =
    hasMap && clickedMapMarker[LOCATION_PAGE_MAP_ID] && clickedMapMarker[LOCATION_PAGE_MAP_ID].spaceId.length !== 0;
  const markerCount = !hasMap || !hasClickedMarker ? 0 : clickedMapMarker[LOCATION_PAGE_MAP_ID]?.spaceId.length ?? 0;

  useEffect(() => {
    setSnapPoints(getSnapPoints(markerCount, maxHeight));
  }, [clickedMapMarker, hasClickedMarker, hasMap, markerCount, maxHeight]);

  useEffect(() => {
    sheetRef.current?.snapTo(getSnapToPoint(markerCount));
  }, [markerCount, snapPoints]);

  return (
    <BottomSheet
      open
      scrollLocking={false}
      skipInitialTransition
      ref={sheetRef}
      defaultSnap={MIN_SIZE}
      snapPoints={({ maxHeight }) => {
        setMaxHeight(maxHeight);
        return snapPoints;
      }}
      blocking={false}
      className={styles.wrapper}
    >
      <SpaceList />
    </BottomSheet>
  );
};

export default BottomDrawer;
