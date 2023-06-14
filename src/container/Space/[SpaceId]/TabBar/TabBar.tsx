"use client";

import { type CSSProperties, useEffect, useRef } from "react";

import cx from "clsx";

import { useHeaderScrollOpacity } from "@/hooks";
import sizes from "@/styles/constants/sizes.module.scss";
import { isClient } from "@/utils/next";
import { getNumberFromPixel } from "@/utils/styles";

import styles from "./tabBar.module.scss";

const TabBar: React.FC = () => {
  const tabBarPosition = useRef(Infinity);

  const { backgroundBreakpoint, backgroundOpacity, breakpoint, opacity } = useHeaderScrollOpacity({
    containerHeight: tabBarPosition.current - getNumberFromPixel(sizes.spaceDetailTabBarHeight),
    headerHeight: getNumberFromPixel(sizes.spaceDetailTabBarHeight),
  });

  const style = {
    "--opacity": opacity,
    "--background-opacity": backgroundOpacity,
    willChange: opacity !== 1 ? "opacity" : "auto",
  } as CSSProperties;

  useEffect(() => {
    if (!isClient) return;

    const $tabBarHorizon = document.getElementById("tab-bar-horizon") as HTMLHRElement;
    tabBarPosition.current = $tabBarHorizon.offsetTop;
  }, []);

  return (
    <nav
      style={style}
      className={cx(styles.wrapper, {
        [styles.breakpoint]: breakpoint,
        [styles.backgroundBreakpoint]: backgroundBreakpoint,
      })}
    >
      <button type="button" className={cx(styles.item, { [styles.active]: true })}>
        상세요금
      </button>
      <button type="button" className={cx(styles.item)}>
        시설/건물
      </button>
      <button type="button" className={cx(styles.item)}>
        주의사항
      </button>
      <button type="button" className={cx(styles.item)}>
        위치
      </button>
      <button type="button" className={cx(styles.item)}>
        리뷰
      </button>
      <div className={styles.activeBar} />
    </nav>
  );
};

export default TabBar;
