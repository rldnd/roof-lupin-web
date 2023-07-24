"use client";

import { CSSProperties } from "react";

import Link from "next/link";

import cx from "clsx";

import { useHeaderScrollOpacity, useToast } from "@/hooks";
import sizes from "@/styles/constants/sizes.module.scss";
import { getNumberFromPixel } from "@/utils/styles";

import { IconBell, IconMainLogo, IconSearch } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const { addToast } = useToast();
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

  return (
    <header
      style={style}
      className={cx(styles.wrapper, {
        [styles.breakpoint]: breakpoint,
        [styles.backgroundBreakpoint]: backgroundBreakpoint,
      })}
    >
      <IconMainLogo onClick={() => addToast({ message: "토스트토스트", type: "toast" })} />
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
