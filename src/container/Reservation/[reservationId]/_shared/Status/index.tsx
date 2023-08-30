"use client";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import {
  RESERVATION_STATUS_MAPPER,
  RESERVATION_STATUS_TEXT_MAPPER,
  TAG_RESERVATION_COLOR_MAPPER,
} from "@/common/constants/reservation";
import type { ReservationDetail } from "@/common/types/reservation";
import { Tag } from "@/components";

import styles from "./status.module.scss";

interface Props {
  className?: string;
  reservation: ReservationDetail;
}

const Status: React.FC<Props> = ({ className, reservation }) => {
  const { code, status } = reservation;

  return (
    <section className={cx(styles.wrapper, className)}>
      <span className={styles.codeWrapper}>
        예약번호<span className={styles.code}>{code}</span>
      </span>
      <Tag size="big" color={TAG_RESERVATION_COLOR_MAPPER[status]}>
        {RESERVATION_STATUS_MAPPER[status]}
      </Tag>
      <h1 className={styles.title}>
        {reservation.space.title}
        {RESERVATION_STATUS_TEXT_MAPPER[status]}
      </h1>
    </section>
  );
};

export default Status;

export const LoadingStatus: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <section className={cx(styles.wrapper, className)}>
      <Skeleton className={styles.codeWrapper} width={120} height={24} />
      <Skeleton width={60} height={28} />
      <div className={styles.loadingTitle}>
        <Skeleton className={styles.title} width={120} />
        <Skeleton className={styles.title} width={150} />
      </div>
    </section>
  );
};
