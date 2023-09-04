"use client";

import { useEffect } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import cx from "clsx";

import { MY_RESERVATION_TABS } from "@/common/constants/reservation";

import styles from "./tabBar.module.scss";

const TabBar: React.FC = () => {
  const { get } = useSearchParams();
  const { replace } = useRouter();
  const tab = get("tab");

  useEffect(() => {
    if (!tab || !MY_RESERVATION_TABS.includes(tab)) replace(`/my-page/reservations?tab=${MY_RESERVATION_TABS[0]}`);
  }, [replace, tab]);

  return (
    <nav className={styles.wrapper}>
      <Link
        className={cx(styles.item, { [styles.active]: tab === MY_RESERVATION_TABS[0] })}
        href="/my-page/reservations?tab=isApproaching"
      >
        다가오는
      </Link>
      <Link
        className={cx(styles.item, { [styles.active]: tab === MY_RESERVATION_TABS[1] })}
        href="/my-page/reservations?tab=used"
      >
        이용완료
      </Link>
      <Link
        className={cx(styles.item, { [styles.active]: tab === MY_RESERVATION_TABS[2] })}
        href="/my-page/reservations?tab=isCanceled"
      >
        취소
      </Link>
    </nav>
  );
};

export default TabBar;
