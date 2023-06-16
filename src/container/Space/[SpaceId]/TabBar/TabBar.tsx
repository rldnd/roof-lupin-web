"use client";

import { memo, type MouseEventHandler, useCallback, useEffect, useMemo, useRef } from "react";

import cx from "clsx";

import { useWindowScroll } from "@/hooks";
import sizes from "@/styles/constants/sizes.module.scss";
import { isClient } from "@/utils/next";
import { getNumberFromPixel } from "@/utils/styles";

import TabBarItem from "./TabBarItem";

import styles from "./tabBar.module.scss";
import pageStyles from "../spaceDetailContainer.module.scss";

export type DataSection = "price" | "facility" | "caution" | "location" | "review";
type Positions = {
  [K in DataSection]: number;
};

const initialPositions: Positions = {
  price: Infinity,
  facility: Infinity,
  caution: Infinity,
  location: Infinity,
  review: Infinity,
};

const getTabBarOffsetTop = (offsetTop: number) => {
  return (
    offsetTop - getNumberFromPixel(sizes.spaceDetailHeaderHeight) - getNumberFromPixel(sizes.spaceDetailTabBarHeight)
  );
};

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
  const positions = useRef(initialPositions);

  const isTabBarVisible = useMemo<boolean>(() => {
    const containerHeight = tabBarPosition.current;
    return y > containerHeight;
  }, [y]);

  const currentPosition = useMemo<DataSection | "">(() => {
    if (!isClient) return "";

    const { price, facility, caution, location, review } = positions.current;

    if (price <= y && y < facility) return "price";
    if (facility <= y && y < caution) return "facility";
    if (caution <= y && y < location) return "caution";
    if (location <= y && y < review) return "location";
    if (review <= y) return "review";
    else return "";
  }, [y]);

  const onClickItem: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    const section = e.currentTarget.dataset.section as DataSection;
    const top = positions.current[section];
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const $tabBarHorizon = document.getElementById("tab-bar-horizon") as HTMLHRElement;
    tabBarPosition.current = getTabBarOffsetTop($tabBarHorizon.offsetTop);

    const $priceSection = document.getElementById("price-section") as HTMLDivElement;
    const $facilitySection = document.getElementById("facility-section") as HTMLDivElement;
    const $cautionSection = document.getElementById("caution-section") as HTMLDivElement;
    const $locationSection = document.getElementById("location-section") as HTMLDivElement;
    const $reviewSection = document.getElementById("review-section") as HTMLDivElement;
    positions.current = {
      price: getSectionOffsetTop($priceSection.offsetTop),
      facility: getSectionOffsetTop($facilitySection.offsetTop),
      caution: getSectionOffsetTop($cautionSection.offsetTop),
      location: getSectionOffsetTop($locationSection.offsetTop),
      review: getSectionOffsetTop($reviewSection.offsetTop),
    };
  }, []);

  return (
    <nav
      className={cx(styles.wrapper, {
        [styles.isVisible]: isTabBarVisible,
      })}
    >
      <TabBarItem currentPosition={currentPosition} onClickItem={onClickItem} sectionName="price">
        상세요금
      </TabBarItem>
      <TabBarItem currentPosition={currentPosition} onClickItem={onClickItem} sectionName="facility">
        시설/건물
      </TabBarItem>
      <TabBarItem currentPosition={currentPosition} onClickItem={onClickItem} sectionName="caution">
        주의사항
      </TabBarItem>
      <TabBarItem currentPosition={currentPosition} onClickItem={onClickItem} sectionName="location">
        위치
      </TabBarItem>
      <TabBarItem currentPosition={currentPosition} onClickItem={onClickItem} sectionName="review">
        리뷰
      </TabBarItem>
      <div className={styles.activeBar} />
    </nav>
  );
};

export default memo(TabBar);
