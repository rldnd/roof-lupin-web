"use client";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { ReservationDetail } from "@/common/types/reservation";
import { getPhoneNumberWithHyphen } from "@/utils/regex";

import styles from "./info.module.scss";

interface Props {
  className?: string;
  reservation: ReservationDetail;
}

const Info: React.FC<Props> = ({ className, reservation }) => {
  return (
    <section className={cx(styles.wrapper, className)}>
      <h2 className={styles.title}>예약 정보</h2>
      <dl className={styles.list}>
        <dt className={styles.label}>예약번호</dt>
        <dd className={styles.value}>{reservation.code}</dd>
        <br />
        <dt className={styles.label}>예약자 이름</dt>
        <dd className={styles.value}>{reservation.user.name}</dd>
        <br />
        <dt className={styles.label}>예약자 휴대폰 번호</dt>
        <dd className={styles.value}>{getPhoneNumberWithHyphen(reservation.userPhoneNumber)}</dd>
      </dl>
    </section>
  );
};

export default Info;

export const LoadingInfo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <section className={cx(styles.wrapper, className)}>
      <h2 className={styles.title}>예약 정보</h2>
      <dl className={styles.loadingList}>
        <Skeleton width={140} />
        <Skeleton width={120} />
        <Skeleton width={150} />
      </dl>
    </section>
  );
};
