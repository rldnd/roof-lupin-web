"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import cx from "clsx";

import { MY_REVIEW_TAB_MAPPER } from "@/common/constants";

import styles from "./tabBar.module.scss";

const TabBar: React.FC = () => {
  const { get } = useSearchParams();
  const tab = get("tab");

  return (
    <nav className={styles.wrapper}>
      <Link
        className={cx(styles.item, { [styles.active]: tab !== MY_REVIEW_TAB_MAPPER.list })}
        href={`/my-page/reviews?tab=${MY_REVIEW_TAB_MAPPER.write}`}
      >
        리뷰 작성
      </Link>
      <Link
        className={cx(styles.item, { [styles.active]: tab === MY_REVIEW_TAB_MAPPER.list })}
        href={`/my-page/reviews?tab=${MY_REVIEW_TAB_MAPPER.list}`}
      >
        작성한 리뷰
      </Link>
    </nav>
  );
};

export default TabBar;

export const LoadingTabBar: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>리뷰 작성</div>
      <div className={styles.item}>작성한 리뷰</div>
    </div>
  );
};
