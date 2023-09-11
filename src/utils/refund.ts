import { RefundPolicy } from "@/common/types/refund";
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
