"use client";

import { useSearchParams } from "next/navigation";

import styles from "./spaceInfo.module.scss";

interface Props {
  title: string;
}

const SpaceInfo: React.FC<Props> = ({ title }) => {
  const searchParams = useSearchParams();

  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const day = searchParams.get("day");
  const userCount = searchParams.get("userCount");

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.name}>{title}</h1>
      <span className={styles.reservationInfo}>
        <time>
          {year}년 {month}월 {day}일 (토)
        </time>
        <span>{userCount}명</span>
      </span>
      <button type="button" className={styles.edit}>
        수정
      </button>
    </section>
  );
};

export default SpaceInfo;
