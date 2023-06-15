"use client";

import { type CSSProperties, memo, useCallback, useEffect, useRef } from "react";

import cx from "clsx";

import { useHeaderScrollOpacity, useWindowScroll } from "@/hooks";
import sizes from "@/styles/constants/sizes.module.scss";
import { isClient } from "@/utils/next";
import { getNumberFromPixel } from "@/utils/styles";

import styles from "./tabBar.module.scss";
import pageStyles from "../spaceDetailContainer.module.scss";

type DataSection = "price" | "facility" | "caution" | "location" | "review";

const getSectionOffsetTop = (offsetTop: number) => {
  return (
    offsetTop -
    getNumberFromPixel(sizes.spaceDetailTabBarHeight) -
    getNumberFromPixel(pageStyles.hrMargin) -
    getNumberFromPixel(sizes.spaceDetailHeaderHeight)
  );
};

const TabBar: React.FC = () => {
  const { y } = useWindowScroll();
  const tabBarPosition = useRef(Infinity);

  const pricePosition = useRef(Infinity);
  const facilityPosition = useRef(Infinity);
  const cautionPosition = useRef(Infinity);
  const locationPosition = useRef(Infinity);
  const reviewPosition = useRef(Infinity);

  const { backgroundBreakpoint, backgroundOpacity, breakpoint, opacity } = useHeaderScrollOpacity({
    containerHeight: tabBarPosition.current - getNumberFromPixel(sizes.spaceDetailTabBarHeight),
    headerHeight: getNumberFromPixel(sizes.spaceDetailTabBarHeight),
  });

  const getCurrentPosition = useCallback((): DataSection | "" => {
    if (!isClient) return "";

    if (pricePosition.current <= y && y < facilityPosition.current) return "price";
    if (facilityPosition.current <= y && y < cautionPosition.current) return "facility";
    if (cautionPosition.current <= y && y < locationPosition.current) return "caution";
    if (locationPosition.current <= y && y < reviewPosition.current) return "location";
    if (reviewPosition.current <= y) return "review";
    else return "";
  }, [y]);

  const style = {
    "--opacity": opacity,
    "--background-opacity": backgroundOpacity,
    willChange: opacity !== 1 ? "opacity" : "auto",
  } as CSSProperties;

  useEffect(() => {
    if (!isClient) return;

    const $tabBarHorizon = document.getElementById("tab-bar-horizon") as HTMLHRElement;
    tabBarPosition.current = $tabBarHorizon.offsetTop;

    const $priceSection = document.getElementById("price-section") as HTMLDivElement;
    const $facilitySection = document.getElementById("facility-section") as HTMLDivElement;
    const $cautionSection = document.getElementById("caution-section") as HTMLDivElement;
    const $locationSection = document.getElementById("location-section") as HTMLDivElement;
    const $reviewSection = document.getElementById("review-section") as HTMLDivElement;
    pricePosition.current = getSectionOffsetTop($priceSection.offsetTop);
    facilityPosition.current = getSectionOffsetTop($facilitySection.offsetTop);
    cautionPosition.current = getSectionOffsetTop($cautionSection.offsetTop);
    locationPosition.current = getSectionOffsetTop($locationSection.offsetTop);
    reviewPosition.current = getSectionOffsetTop($reviewSection.offsetTop);
  }, []);

  return (
    <nav
      style={style}
      className={cx(styles.wrapper, {
        [styles.breakpoint]: breakpoint,
        [styles.backgroundBreakpoint]: backgroundBreakpoint,
      })}
    >
      <button type="button" className={cx(styles.item, { [styles.active]: getCurrentPosition() === "price" })}>
        상세요금
      </button>
      <button type="button" className={cx(styles.item, { [styles.active]: getCurrentPosition() === "facility" })}>
        시설/건물
      </button>
      <button
        type="button"
        className={cx(styles.item, { [styles.active]: getCurrentPosition() === "caution" })}
        data-section="caution"
      >
        주의사항
      </button>
      <button type="button" className={cx(styles.item, { [styles.active]: getCurrentPosition() === "location" })}>
        위치
      </button>
      <button type="button" className={cx(styles.item, { [styles.active]: getCurrentPosition() === "review" })}>
        리뷰
      </button>
      <div className={styles.activeBar} />
    </nav>
  );
};

export default memo(TabBar);
