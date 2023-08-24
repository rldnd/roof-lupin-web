"use client";

import { memo, type MouseEventHandler, useCallback, useMemo, useRef } from "react";

import { useParams } from "next/navigation";

import cx from "clsx";

import type { ReviewSummary } from "@/common/types/review";
import { useClientEffect, useSuspenseQuery, useWindowScroll } from "@/hooks";
import { getReviewsSummaryApi } from "@/services/review";
import sizes from "@/styles/constants/sizes.module.scss";
import { isClient } from "@/utils/next";
import { getNumberFromPixel } from "@/utils/styles";

import TabBarItem from "./TabBarItem";
import pageStyles from "../../spaceDetailContainer.module.scss";

import styles from "./tabBar.module.scss";

export type DataSection = "intro" | "service" | "review" | "refund";
type Positions = {
  [K in DataSection]: number;
};

const initialPositions: Positions = {
  intro: Infinity,
  service: Infinity,
  review: Infinity,
  refund: Infinity,
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
  const { spaceId } = useParams();
  const { y } = useWindowScroll();
  const tabBarPosition = useRef(Infinity);
  const positions = useRef(initialPositions);

  const { data: summary } = useSuspenseQuery<ReviewSummary>(
    ["getReviewsSummary", spaceId],
    () => getReviewsSummaryApi(spaceId),
    {
      suspense: false,
    },
  );

  const isTabBarVisible = useMemo<boolean>(() => {
    const containerHeight = tabBarPosition.current;
    return y > containerHeight;
  }, [y]);

  const currentPosition = useMemo<DataSection | "">(() => {
    if (!isClient) return "";

    const { intro, service, review, refund } = positions.current;

    if (intro <= y && y < service) return "intro";
    if (service <= y && y < review) return "service";
    if (review <= y && y < refund) return "review";
    if (refund <= y) return "refund";
    else return "";
  }, [y]);

  const onClickItem: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    const section = e.currentTarget.dataset.section as DataSection;
    const top = positions.current[section];
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  useClientEffect(() => {
    const $tabBarHorizon = document.getElementById("tab-bar-horizon") as HTMLHRElement;
    tabBarPosition.current = getTabBarOffsetTop($tabBarHorizon.offsetTop);

    const $serviceSection = document.getElementById("service-section") as HTMLDivElement;
    const $reviewSection = document.getElementById("review-section") as HTMLDivElement;
    const $refundSection = document.getElementById("refund-section") as HTMLDivElement;
    positions.current = {
      intro: 0,
      service: getSectionOffsetTop($serviceSection.offsetTop),
      review: getSectionOffsetTop($reviewSection.offsetTop),
      refund: getSectionOffsetTop($refundSection.offsetTop),
    };
  }, []);

  return (
    <nav
      className={cx(styles.wrapper, {
        [styles.isVisible]: isTabBarVisible,
      })}
    >
      <TabBarItem currentPosition={currentPosition} onClickItem={onClickItem} sectionName="intro">
        공간소개
      </TabBarItem>
      <TabBarItem currentPosition={currentPosition} onClickItem={onClickItem} sectionName="service">
        시설/건물
      </TabBarItem>
      <TabBarItem currentPosition={currentPosition} onClickItem={onClickItem} sectionName="review">
        리뷰{summary?.count ? `(${summary.count})` : ""}
      </TabBarItem>
      <TabBarItem currentPosition={currentPosition} onClickItem={onClickItem} sectionName="refund">
        정책/정보
      </TabBarItem>
      <div className={styles.activeBar} />
    </nav>
  );
};

export default memo(TabBar);
