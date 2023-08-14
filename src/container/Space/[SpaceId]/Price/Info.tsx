"use client";

import { useAtomValue } from "jotai";
import Skeleton from "react-loading-skeleton";

import { spaceReservationInfoState } from "@/states";
import { dayjs } from "@/utils/date";

import styles from "./info.module.scss";

const Info: React.FC = () => {
  const { year, month, day, userCount } = useAtomValue(spaceReservationInfoState);
  const date = dayjs(`${year}-${month}-${day}`).format("MM월 DD일 ddd");

  return (
    <section className={styles.wrapper}>
      <span className={styles.text}>
        <time dateTime={date} className={styles.info}>
          {date}요일
        </time>
        <span className={styles.info}>, {userCount}인 기준</span>
        가격이에요.
      </span>
      <br />
      <span className={styles.text}>상세 요금은 요일, 공휴일, 시간대, 인원에 따라 달라져요.</span>
    </section>
  );
};

export default Info;

export const LoadingInfo: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <Skeleton width={200} />
      <Skeleton width={250} style={{ marginTop: "4px" }} />
    </section>
  );
};
