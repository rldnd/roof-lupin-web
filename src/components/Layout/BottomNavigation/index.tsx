"use client";

import { MouseEventHandler, useCallback } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import cx from "clsx";

import { AuthChecker } from "@/components";
import { usePlatform, useScrollDirection } from "@/hooks";

import { IconAvatar, IconBookmark, IconHome, IconLocation, IconSearch } from "public/icons";

import styles from "./bottomNavigation.module.scss";

const checkIsActive = (pathname: string, href: string): boolean => {
  return pathname === href;
};

interface Props {
  blockScrollInteraction?: boolean;
}

const BottomNavigation: React.FC<Props> = ({ blockScrollInteraction = false }) => {
  const { push } = useRouter();
  const { isWebview } = usePlatform();
  const scrollDirection = useScrollDirection();
  const pathname = usePathname();

  const onClickButton: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      push(e.currentTarget.value);
    },
    [push],
  );

  return (
    <footer
      className={cx(styles.wrapper, styles[scrollDirection], {
        [styles.isWebview]: isWebview,
        [styles.blockScrollInteraction]: blockScrollInteraction,
      })}
    >
      <nav>
        <Link className={cx(styles.item, { [styles.isActive]: checkIsActive(pathname, "/") })} href="/">
          <div className={styles.iconWrapper}>
            <IconHome />
          </div>
          <span>홈</span>
        </Link>
        <Link className={cx(styles.item, { [styles.isActive]: checkIsActive(pathname, "/search") })} href="/search">
          <div className={styles.iconWrapper}>
            <IconSearch />
          </div>
          <span>검색</span>
        </Link>
        <Link
          className={cx(styles.item, { [styles.isActive]: checkIsActive(pathname, "/locations") })}
          href="/locations"
        >
          <div className={styles.iconWrapper}>
            <IconLocation />
          </div>
          <span>주변</span>
        </Link>
        <AuthChecker>
          <button
            className={cx(styles.item, { [styles.isActive]: checkIsActive(pathname, "/interests") })}
            value="/interests"
            onClick={onClickButton}
          >
            <div className={styles.iconWrapper}>
              <IconBookmark />
            </div>
            <span>찜</span>
          </button>
        </AuthChecker>
        <Link
          className={cx(styles.item, { [styles.isActive]: checkIsActive(pathname, "/auth/login") })}
          href="/auth/login"
        >
          <div className={styles.iconWrapper}>
            <IconAvatar />
          </div>
          <span>마이</span>
        </Link>
      </nav>
    </footer>
  );
};

export default BottomNavigation;
