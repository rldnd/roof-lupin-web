"use client";

import { CSSProperties } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";

import cx from "clsx";

import { useHeaderScrollOpacity, useIamport } from "@/hooks";
import sizes from "@/styles/constants/sizes.module.scss";
import { getNumberFromPixel } from "@/utils/styles";

import { IconMainLogo, IconSearch } from "public/icons";

import { LoadingAlarm } from "./Alarm";

import styles from "./header.module.scss";

const Alarm = dynamic(() => import("./Alarm"), {
  ssr: false,
  loading: () => <LoadingAlarm className={styles.alarmIcon} />,
});

const Header: React.FC = () => {
  const { requestCertificate } = useIamport();
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
    // window.scrollTo({ top: 0, behavior: "smooth" });
    requestCertificate();
  };

  return (
    <header
      style={style}
      className={cx(styles.wrapper, {
        [styles.breakpoint]: breakpoint,
        [styles.backgroundBreakpoint]: backgroundBreakpoint,
      })}
    >
      <button type="button" aria-label="루프루팡 로고" onClick={onClickLogo}>
        <IconMainLogo />
      </button>
      <nav>
        <Link href="/search" title="검색 페이지">
          <IconSearch />
        </Link>
        <Alarm className={styles.alarmIcon} />
      </nav>
    </header>
  );
};

export default Header;
