"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import cx from "clsx";

import { QnACount } from "@/common/types/qna";
import { useSuspenseQuery } from "@/hooks";
import { getMyQnasCountApi } from "@/services/qna";

import styles from "./tabBar.module.scss";

const TabBar: React.FC = () => {
  const { get } = useSearchParams();
  const isAnswered = get("isAnswered") === "true";

  const { data } = useSuspenseQuery<QnACount>(["myQnasCount"], getMyQnasCountApi);

  return (
    <nav className={styles.wrapper}>
      <Link className={cx(styles.item, { [styles.active]: !isAnswered })} href="/my-page/qnas?isAnswered=false">
        미답변<span className={styles.count}>{data.notAnsweredCount}</span>
      </Link>
      <Link className={cx(styles.item, { [styles.active]: isAnswered })} href="/my-page/qnas?isAnswered=true">
        답변<span className={styles.count}>{data.answeredCount}</span>
      </Link>
    </nav>
  );
};

export default TabBar;

export const LoadingTabBar: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>미답변</div>
      <div className={styles.item}>답변</div>
    </div>
  );
};
