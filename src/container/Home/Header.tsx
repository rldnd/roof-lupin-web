"use client";

import { CSSProperties, useLayoutEffect } from "react";

import Link from "next/link";

import cx from "clsx";

import { WebScreenStatusBarThemePayload } from "@/common/types/webview/screen";
import { useHeaderScrollOpacity, useWebview } from "@/hooks";
import sizes from "@/styles/constants/sizes.module.scss";
import { getNumberFromPixel } from "@/utils/styles";

import { IconBell, IconMainLogo, IconSearch } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const { sendMessage } = useWebview();
  const { breakpoint, backgroundBreakpoint, opacity, backgroundOpacity } = useHeaderScrollOpacity({
    containerHeight:
      getNumberFromPixel(sizes.mainCarouselHeight) + getNumberFromPixel(sizes.mainCarouselProgressHeight),
    headerHeight: getNumberFromPixel(sizes.mainHeaderHeight),
  });

  const style = {
    "--opacity": opacity,
    "--background-opacity": backgroundOpacity,
    willChange: opacity !== 1 ? "opacity" : "auto",
  } as CSSProperties;

  useLayoutEffect(() => {
    if (opacity === 1) {
      sendMessage<WebScreenStatusBarThemePayload>({
        type: "web-screen/statusBarTheme",
        data: { theme: "dark" },
      });
    }

    if (opacity === 0) {
      sendMessage<WebScreenStatusBarThemePayload>({
        type: "web-screen/statusBarTheme",
        data: { theme: "light" },
      });
    }
  }, [opacity, sendMessage]);

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
