import type { RefundPolicy } from "@/common/types/refund";
import type { ReservationDetail } from "@/common/types/reservation";
import { dayjs } from "@/utils/date";

export const getRefundAllDate = (refundPolicies: RefundPolicy[], useDate: Date | dayjs.Dayjs) => {
  const allRefundItem = refundPolicies.find((policy) => policy.refundRate === 100);
  if (!allRefundItem) return null;

  const useDateDayjs = dayjs(useDate);
  return dayjs(`${useDateDayjs.year()}-${useDateDayjs.month() + 1}-${useDateDayjs.date()}`).subtract(
    allRefundItem.daysBefore,
    "day",
  );
};

export const getRefundPolicySectionText = (refundPolicies: RefundPolicy[], useDate: Date | dayjs.Dayjs): string => {
  const refundAllDate = getRefundAllDate(refundPolicies, useDate);
  if (!refundAllDate) return "결제 후 2시간 이내에는 100% 환불이 가능합니다. (단, 이용시간 전까지만 가능)";
  return `${refundAllDate.year()}년 ${
    refundAllDate.month() + 1
  }월 ${refundAllDate.date()}일까지 수수료 없이 취소가 가능합니다. ${
    refundAllDate.add(1, "day").month() + 1
  }월 ${refundAllDate.add(1, "day").date()}일 이후로는 부분 환불이 가능합니다.`;
};

export const getRefundPrice = (reservation: ReservationDetail) => {
  const { year, month, day, rentalTypes, payedAt, space } = reservation;
  const { refundPolicies } = space;
  const startAt = rentalTypes.map((rentalType) => rentalType.startAt).sort((a, b) => a - b)[0];
  const isBeforePayedTwoHours = dayjs().isBefore(dayjs(payedAt).add(2, "hour"));
  const isBeforeUse = dayjs().isBefore(dayjs(`${year}-${month}-${day} ${startAt}:00`));

  if (isBeforePayedTwoHours && isBeforeUse) return 0;
  if (!isBeforeUse) throw Error("사용 이후 환불은 불가합니다.");
  const today = dayjs();
  const daysDiff = Math.abs(
    dayjs(`${today.year()}-${today.month() + 1}-${today.date()}`).diff(`${year}-${month}-${day}`, "day"),
  );
  const todayRefundPolicy = refundPolicies.find((policy) => policy.daysBefore === daysDiff);
  if (!todayRefundPolicy) throw Error("환불 정책이 없습니다.");

  return (reservation.totalCost * (100 - todayRefundPolicy.refundRate)) / 100;
};
