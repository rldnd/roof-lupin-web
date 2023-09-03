"use client";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { UserCoupon } from "@/common/types/coupon";
import { getCouponPrice } from "@/utils/coupon";
import { dayjs } from "@/utils/date";

import styles from "./coupon.module.scss";

interface Props {
  userCoupon: UserCoupon;
  className?: string;
}

const Coupon: React.FC<Props> = ({ userCoupon, className }) => {
  const dueDays = Math.abs(
    dayjs(`${dayjs().year()}-${dayjs().month() + 1}-${dayjs().date()}`).diff(userCoupon.usageDateEndAt, "day"),
  );

  const endDate = dayjs(userCoupon.usageDateEndAt).format("YYYY.MM.DD");

  return (
    <li className={cx(styles.wrapper, className)}>
      <strong className={styles.percent}>{getCouponPrice(userCoupon)}</strong>
      <span className={styles.name}>{userCoupon.coupon.name}</span>
      <div className={styles.bottom}>
        <span className={styles.dueDays}>D-{dueDays}</span>
        <time dateTime={endDate} className={styles.time}>
          {endDate} 까지
        </time>
      </div>
    </li>
  );
};

export default Coupon;

export const LoadingCoupon: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Skeleton className={styles.percent} width={80} />
      <Skeleton className={styles.name} width={100} />
      <Skeleton className={styles.bottom} width={40} />
    </div>
  );
};
