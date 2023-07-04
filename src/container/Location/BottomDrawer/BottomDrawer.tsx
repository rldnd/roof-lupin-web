"use client";

import { lazy, useEffect, useRef, useState } from "react";

import { type BottomSheetRef } from "react-spring-bottom-sheet";

import { useClientEffect, useNaverMap } from "@/hooks";
import sizes from "@/styles/constants/sizes.module.scss";
import { getNumberFromPixel } from "@/utils/styles";

import { IconCurrentPosition } from "public/icons";

import styles from "./bottomDrawer.module.scss";

const BottomSheet = lazy(() => import("react-spring-bottom-sheet").then((module) => ({ default: module.BottomSheet })));

const MIN_SIZE = getNumberFromPixel(sizes.bottomNavigationHeight) + 80;
const MID_SIZE = (maxHeight: number) => getNumberFromPixel(sizes.bottomNavigationHeight) + maxHeight / 2;
const MAX_SIZE = (maxHeight: number) => maxHeight;

const BottomDrawer: React.FC = () => {
  const currentPositionButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<BottomSheetRef>(null);
  const { moveCenter } = useNaverMap("location-page-naver-map");

  const onClick = () => {
    moveCenter({ lat: "37.3595704", lng: "128" });
  };

  useEffect(() => {
    console.log(currentPositionButtonRef.current?.getBoundingClientRect());
  }, []);

  return (
    <>
      <BottomSheet
        open
        skipInitialTransition
        ref={sheetRef}
        defaultSnap={MIN_SIZE}
        snapPoints={({ maxHeight }) => {
          return [MIN_SIZE, MID_SIZE(maxHeight), MAX_SIZE(maxHeight)];
        }}
        expandOnContentDrag
        blocking={false}
        onAnimationStart={() => {
          console.log(`drag: ${sheetRef.current?.height}`);
        }}
        onSpringStart={() => {
          console.log(`start: ${sheetRef.current?.height}`);
          requestAnimationFrame(() => {
            console.log(`to: ${sheetRef.current?.height}`);
          });
        }}
        onSpringEnd={() => {
          console.log(`end: ${sheetRef.current?.height}`);
        }}
        className={styles.wrapper}
      >
        <button type="button" className={styles.currentPositionButton} ref={currentPositionButtonRef} onClick={onClick}>
          <IconCurrentPosition />
        </button>
        <div style={{ height: 700 }}>여기도 공간 저기도 공간</div>
      </BottomSheet>
    </>
  );
};

export default BottomDrawer;
