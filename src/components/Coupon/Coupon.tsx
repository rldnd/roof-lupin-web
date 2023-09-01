"use client";

import type { UserCoupon } from "@/common/types/coupon";

import styles from "./coupon.module.scss";

interface Props {
  userCoupon: UserCoupon;
  className?: string;
}

const Coupon: React.FC<Props> = ({ userCoupon, className }) => {
  return <></>;
};

export default Coupon;

export const LoadingCoupon: React.FC = () => {
  return null;
};
