"use client";

import type { ComponentProps } from "react";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { UserCoupon } from "@/common/types/coupon";
import { dayjs } from "@/utils/date";

import styles from "./couponMenu.module.scss";

interface Props extends ComponentProps<"button"> {
  userCoupon: UserCoupon;
  active: boolean;
}

const CouponMenu: React.FC<Props> = ({ className, userCoupon, active, ...props }) => {
  const { name, discountType, discountValue } = userCoupon.coupon;
  const dueDays = Math.abs(
    dayjs(`${dayjs().year()}-${dayjs().month() + 1}-${dayjs().date()}`).diff(userCoupon.usageDateEndAt, "day"),
  );

  const endDate = dayjs(userCoupon.usageDateEndAt).format("YYYY.MM.DD");

  return (
    <button type="button" className={cx(styles.wrapper, className, { [styles.active]: active })} {...props}>
      <div className={styles.info}>
        <strong className={styles.percent}>
          {discountType === "PERCENTAGE" && `${discountValue}%`}
          {discountType === "VALUE" && `${discountValue.toLocaleString("ko-KR")}원`}
        </strong>
        <span className={styles.name}>{name}</span>
        <div className={styles.bottom}>
          <span className={styles.dueDays}>D-{dueDays}</span>
          <time dateTime={endDate} className={styles.time}>
            {endDate} 까지
          </time>
        </div>
      </div>
      <div className={styles.radioWrapper}>
        <div className={styles.radio} />
      </div>
    </button>
  );
};

export default CouponMenu;

export const LoadingCouponMenu: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <Skeleton className={styles.percent} width={80} />
        <Skeleton className={styles.name} width={100} />
        <Skeleton className={styles.bottom} width={40} />
      </div>
    </div>
  );
};
