"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import cx from "clsx";

import { isWebview } from "@/utils/webview";

import { IconHome } from "public/icons";

import styles from "./bottomNavigation.module.scss";

const checkIsActive = (pathname: string, href: string): boolean => {
  return pathname.includes(href);
};

const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <footer className={cx(styles.wrapper, { [styles.isWebview]: isWebview })}>
      <nav>
        <Link className={cx(styles.item, { [styles.isActive]: checkIsActive(pathname, "/") })} href="/">
          <IconHome />
          <span>홈</span>
        </Link>
        <Link className={cx(styles.item, { [styles.isActive]: checkIsActive(pathname, "/search") })} href="/search">
          <IconHome />
          <span>검색</span>
        </Link>
        <Link
          className={cx(styles.item, { [styles.isActive]: checkIsActive(pathname, "/locations") })}
          href="/locations"
        >
          <IconHome />
          <span>주변</span>
        </Link>
        <Link
          className={cx(styles.item, { [styles.isActive]: checkIsActive(pathname, "/interests") })}
          href="/interests"
        >
          <IconHome />
          <span>찜</span>
        </Link>
        <Link
          className={cx(styles.item, { [styles.isActive]: checkIsActive(pathname, "/auth/login") })}
          href="/auth/login"
        >
          <IconHome />
          <span>마이</span>
        </Link>
      </nav>
    </footer>
  );
};

export default BottomNavigation;
