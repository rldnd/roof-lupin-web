"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import cx from "clsx";

import { MY_RESERVATION_TAB_MAPPER } from "@/common/constants/reservation";

import styles from "./tabBar.module.scss";

const TabBar: React.FC = () => {
  const { get } = useSearchParams();
  const tab = get("tab");

  return (
    <nav className={styles.wrapper}>
      <Link
        className={cx(styles.item, {
          [styles.active]: tab !== MY_RESERVATION_TAB_MAPPER.isUsed && tab !== MY_RESERVATION_TAB_MAPPER.isCanceled,
        })}
        href={`/my-page/reservations?tab=${MY_RESERVATION_TAB_MAPPER.isApproaching}`}
      >
        다가오는
      </Link>
      <Link
        className={cx(styles.item, { [styles.active]: tab === MY_RESERVATION_TAB_MAPPER.isUsed })}
        href={`/my-page/reservations?tab=${MY_RESERVATION_TAB_MAPPER.isUsed}`}
      >
        이용완료
      </Link>
      <Link
        className={cx(styles.item, { [styles.active]: tab === MY_RESERVATION_TAB_MAPPER.isCanceled })}
        href={`/my-page/reservations?tab=${MY_RESERVATION_TAB_MAPPER.isCanceled}`}
      >
        취소
      </Link>
    </nav>
  );
};

export default TabBar;
