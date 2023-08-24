import type { UserCoupon } from "@/common/types/coupon";

export const getCouponPrice = (userCoupon: UserCoupon) => {
  const { discountValue, discountType } = userCoupon.coupon;
  if (discountType === "PERCENTAGE") return `${discountValue}%`;
  return `${discountValue.toLocaleString("ko-KR")}원`;
};
