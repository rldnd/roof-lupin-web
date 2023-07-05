"use client";

import { lazy, useEffect, useRef, useState } from "react";

import cx from "clsx";
import { type BottomSheetRef } from "react-spring-bottom-sheet";

import { useClientEffect, useNaverMap } from "@/hooks";
import sizes from "@/styles/constants/sizes.module.scss";
import { getNumberFromPixel } from "@/utils/styles";

import { IconCurrentPosition } from "public/icons";

import styles from "./bottomDrawer.module.scss";

const BottomSheet = lazy(() => import("react-spring-bottom-sheet").then((module) => ({ default: module.BottomSheet })));

const MIN_SIZE = getNumberFromPixel(sizes.bottomNavigationHeight) + 80;
const MAX_SIZE = (maxHeight: number) =>
  maxHeight - getNumberFromPixel(sizes.baseHeaderHeight) - getNumberFromPixel(sizes.locationCategoryHeight) - 40;

const BottomDrawer: React.FC = () => {
  const [isViewButton, setIsViewButton] = useState(true);

  const sheetRef = useRef<BottomSheetRef>(null);
  const { moveCenter } = useNaverMap("location-page-naver-map");

  const onClick = () => {
    moveCenter({ lat: "37.3595704", lng: "128" });
  };

  return (
    <>
      <BottomSheet
        open
        skipInitialTransition
        ref={sheetRef}
        defaultSnap={MIN_SIZE}
        snapPoints={({ maxHeight }) => [MIN_SIZE, MAX_SIZE(maxHeight)]}
        expandOnContentDrag
        blocking={false}
        className={styles.wrapper}
        onSpringStart={() => {
          requestAnimationFrame(() => {
            if (sheetRef.current?.height !== MIN_SIZE) setIsViewButton(false);
            else setIsViewButton(true);
          });
        }}
      >
        <button
          type="button"
          className={cx(styles.currentPositionButton, { [styles.visible]: isViewButton })}
          onClick={onClick}
        >
          <IconCurrentPosition />
        </button>
        <div style={{ height: 700 }}>여기도 공간 저기도 공간</div>
      </BottomSheet>
    </>
  );
};

export default BottomDrawer;
