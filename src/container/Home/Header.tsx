"use client";

import { CSSProperties } from "react";

import Link from "next/link";

import cx from "clsx";

import { useContentWidth, useHeaderScrollOpacity } from "@/hooks";
import useBreakPoint from "@/hooks/useBreakpoint";
import sizes from "@/styles/constants/sizes.module.scss";
import { getNumberFromPixel } from "@/utils/styles";

import { IconBell, IconMainLogo, IconSearch } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const { width } = useContentWidth();

  const mainCarouselRatio = useBreakPoint({
    breakpoint: 550,
    maxValue: Number(sizes.mainCarouselRatioWide),
    minValue: Number(sizes.mainCarouselRatio),
  });

  const { breakpoint, backgroundBreakpoint, opacity, backgroundOpacity } = useHeaderScrollOpacity({
    containerHeight: (1 / mainCarouselRatio) * width + getNumberFromPixel(sizes.mainCarouselProgressHeight),
    headerHeight: getNumberFromPixel(sizes.mainHeaderHeight),
  });

  const style = {
    "--opacity": opacity,
    "--background-opacity": backgroundOpacity,
    willChange: opacity !== 1 ? "opacity" : "auto",
  } as CSSProperties;

  return (
    <header
      style={style}
      className={cx(styles.wrapper, {
        [styles.breakpoint]: breakpoint,
        [styles.backgroundBreakpoint]: backgroundBreakpoint,
      })}
    >
      <IconMainLogo />
      <nav>
        <Link href="/" title="검색 페이지">
          <IconSearch />
        </Link>
        <Link href="/" title="알림 페이지">
          <IconBell />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
