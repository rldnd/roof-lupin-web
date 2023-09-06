"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import cx from "clsx";

import { ReviewCount } from "@/common/types/review";
import { useSuspenseQuery } from "@/hooks";
import { getMyReviewsCountApi } from "@/services/review";

import styles from "./tabBar.module.scss";

const TabBar: React.FC = () => {
  const pathname = usePathname();
  const { data } = useSuspenseQuery<ReviewCount>(["getMyReviewsCount"], getMyReviewsCountApi);

  return (
    <nav className={styles.wrapper}>
      <Link
        className={cx(styles.item, { [styles.active]: pathname.includes("write-review") })}
        href="/my-page/reviews/write-review"
      >
        리뷰 작성
      </Link>
      <Link
        className={cx(styles.item, { [styles.active]: !pathname.includes("write-review") })}
        href="/my-page/reviews"
      >
        작성한 리뷰<span className={styles.count}>{data.count}</span>
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
