"use client";

import Skeleton from "react-loading-skeleton";

import { SpaceDetail } from "@/common/types/space";

import styles from "./topSection.module.scss";

interface Props {
  space?: SpaceDetail;
}

const TopSection: React.FC<Props> = ({ space }) => {
  if (!space) return <LoadingTopSection />;

  return (
    <section className={styles.wrapper}>
      <img alt="공간 이미지" src={space.thumbnail} className={styles.image} />
      <h1 className={styles.title}>
        {space.title}
        <br />
        예약이 완료되었어요!
      </h1>
      <p className={styles.desc}>
        이용하기 몇 일 전에 <span>리마인드 알림</span>을 보내드릴게요!
      </p>
    </section>
  );
};

export default TopSection;

export const LoadingTopSection: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <Skeleton className={styles.image} />
      <Skeleton width={120} className={styles.title} />
      <Skeleton className={styles.desc} />
    </section>
  );
};
