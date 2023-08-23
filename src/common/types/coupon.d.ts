import type { CommonUser } from "./user";

export interface UserCouponCount {
  count: number;
}

export type CouponDiscountType = "PERCENTAGE" | "VALUE";

export interface Coupon {
  /** 쿠폰 id */
  id: string;
  /** 쿠폰 이름 */
  name: string;
  /** 쿠폰 할인 타입 */
  discountType: CouponDiscountType;
  /** 쿠폰 할인 값 */
  discountValue: number;
  /** 쿠폰 설명 */
  description: string;
  /** 루팡페이 쿠폰 여부 */
  isLupinPay: boolean;
  /** 쿠폰 기본 유효기간 시작 날짜 */
  defaultDueDateStart: Date | null;
  /** 쿠폰 기본 유효기간 */
  defaultDueDay: number;
}

export interface UserCoupon {
  /** 유저 쿠폰 id */
  id: string;
  /** 쿠폰 사용 시작일 */
  usageDateStartAt: Date;
  /** 쿠폰 사용 종료일 */
  usageDateEndAt: Date;
  /** 쿠폰 생성일 */
  createdAt: Date;
  /** 예약 id */
  reservationId: string | null;
  /** 유저 정보 */
  user: CommonUser;
  /** 쿠폰 정보 */
  coupon: Coupon;
}
