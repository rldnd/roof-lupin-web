"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import type { UserCoupon } from "@/common/types/coupon";
import { dayjs } from "@/utils/date";

import styles from "./couponMenu.module.scss";

interface Props extends ComponentProps<"input"> {
  userCoupon: UserCoupon;
}

const CouponMenu: React.FC<Props> = ({ className, userCoupon, ...props }) => {
  const { name, discountType, discountValue } = userCoupon.coupon;
  const dueDays = dayjs().diff(userCoupon.usageDateEndAt, "day");
  const endDate = dayjs(userCoupon.usageDateEndAt).format("YYYY.MM.DD");

  return (
    <label className={cx(styles.wrapper, className)}>
      <div className={styles.info}>
        <strong className={styles.percent}>
          {discountType === "PERCENTAGE" && `${discountValue}%`}
          {discountType === "VALUE" && `${discountValue.toLocaleString("ko-KR")}원`}
        </strong>
        <span className={styles.name}>{name}</span>
        <div className={styles.bottom}>
          <span className={styles.dueDays}>D - {dueDays}</span>
          <time dateTime={endDate}>{endDate} 까지</time>
        </div>
      </div>
      <div className={styles.radioWrapper}>
        <input type="radio" {...props} />
      </div>
    </label>
  );
};

export default CouponMenu;
