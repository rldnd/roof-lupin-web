"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import cx from "clsx";

import styles from "./tabBar.module.scss";

const TabBar: React.FC = () => {
  const { get } = useSearchParams();
  const { replace } = useRouter();
  const tab = get("tab");

  return (
    <nav className={styles.wrapper}>
      <Link
        // className={cx(styles.item, { [styles.active]: tab ===  })}
        href="/my-page/reservations?tab=write"
      >
        리뷰 작성
      </Link>
      <Link
        // className={cx(styles.item, { [styles.active]: tab === MY_REVIEW_TABS[1] })}
        href={`/my-page/reviews?tab=`}
      >
        작성한 리뷰
      </Link>
    </nav>
  );
};

export default TabBar;
