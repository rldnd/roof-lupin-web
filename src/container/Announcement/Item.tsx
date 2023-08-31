"use client";

import Skeleton from "react-loading-skeleton";

import type { Announcement } from "@/common/types/announcement";
import { formatYYMMDD } from "@/utils/date";

import { IconGrayBottomChevronLarge } from "public/icons";

import styles from "./item.module.scss";

interface Props {
  announcement: Announcement;
}

const Item: React.FC<Props> = ({ announcement }) => {
  const date = formatYYMMDD(announcement.createdAt);

  return (
    <details className={styles.wrapper}>
      <div className={styles.content}>{announcement.content}</div>
      <summary className={styles.titleWrapper}>
        <strong className={styles.title}>{announcement.title}</strong>
        <div className={styles.chevronWrapper}>
          <IconGrayBottomChevronLarge />
        </div>
        <time className={styles.date} dateTime={date}>
          {date}
        </time>
      </summary>
    </details>
  );
};

export default Item;

export const LoadingItem: React.FC = () => {
  return <Skeleton width="100%" height={96} />;
};
