"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import cx from "clsx";

import styles from "./tabBar.module.scss";

const TabBar: React.FC = () => {
  const { get } = useSearchParams();
  const isAnswered = get("isAnswered") === "true";

  return (
    <nav className={styles.wrapper}>
      <Link className={cx(styles.item, { [styles.active]: !isAnswered })} href="/my-page/qnas?isAnswered=false">
        미답변
      </Link>
      <Link className={cx(styles.item, { [styles.active]: isAnswered })} href="/my-page/qnas?isAnswered=true">
        답변
      </Link>
    </nav>
  );
};

export default TabBar;
