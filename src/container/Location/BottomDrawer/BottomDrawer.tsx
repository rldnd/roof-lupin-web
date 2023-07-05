"use client";

import { lazy, Suspense, useRef } from "react";

import { type BottomSheetRef } from "react-spring-bottom-sheet";

import sizes from "@/styles/constants/sizes.module.scss";
import { getNumberFromPixel } from "@/utils/styles";

import SpaceList from "./SpaceList";

import styles from "./bottomDrawer.module.scss";

const BottomSheet = lazy(() => import("react-spring-bottom-sheet").then((module) => ({ default: module.BottomSheet })));

const MIN_SIZE = getNumberFromPixel(sizes.locationBottomDrawerMinHeight);
const MAX_SIZE = (maxHeight: number) =>
  maxHeight - getNumberFromPixel(sizes.baseHeaderHeight) - getNumberFromPixel(sizes.locationCategoryHeight) - 40;

const BottomDrawer: React.FC = () => {
  const sheetRef = useRef<BottomSheetRef>(null);

  return (
    <BottomSheet
      open
      scrollLocking={false}
      skipInitialTransition
      ref={sheetRef}
      defaultSnap={MIN_SIZE}
      snapPoints={({ maxHeight }) => [MIN_SIZE, MAX_SIZE(maxHeight)]}
      expandOnContentDrag
      blocking={false}
      className={styles.wrapper}
    >
      <Suspense fallback={null}>
        <SpaceList />
      </Suspense>
    </BottomSheet>
  );
};

export default BottomDrawer;
