"use client";

import { CSSProperties } from "react";

import Link from "next/link";

import cx from "clsx";

import { useHeaderScrollOpacity, usePlatform } from "@/hooks";
import sizes from "@/styles/constants/sizes.module.scss";
import { getNumberFromPixel } from "@/utils/styles";

import { IconBell, IconMainLogo, IconSearch } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const { isAndroidWebview, isIosWebview, isMobile, isWebview } = usePlatform();
  const { breakpoint, backgroundBreakpoint, opacity, backgroundOpacity } = useHeaderScrollOpacity({
    containerHeight:
      getNumberFromPixel(sizes.mainCarouselHeight) + getNumberFromPixel(sizes.mainCarouselProgressHeight),
    headerHeight: getNumberFromPixel(sizes.baseHeaderHeight),
  });

  const style = {
    "--opacity": opacity,
    "--background-opacity": backgroundOpacity,
    willChange: opacity !== 1 ? "opacity" : "auto",
  } as CSSProperties;

  const onClickLogo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      style={style}
      className={cx(styles.wrapper, {
        [styles.breakpoint]: breakpoint,
        [styles.backgroundBreakpoint]: backgroundBreakpoint,
      })}
    >
      안드: {isAndroidWebview ? true : false}
      아이폰: {isIosWebview ? true : false}
      모발: {isMobile ? true : false}
      웹뷰: {isWebview ? true : false}
      <button type="button" aria-label="루프루팡 로고" onClick={onClickLogo}>
        <IconMainLogo />
      </button>
      <nav>
        <Link href="/search" title="검색 페이지">
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
