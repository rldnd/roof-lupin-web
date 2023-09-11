import type { Color } from "@/components/Common/Tag";

export const MY_RESERVATION_TAB_MAPPER = {
  isApproaching: "isApproaching",
  isUsed: "isUsed",
  isCanceled: "isCanceled",
} as const;

export const RESERVATION_STATUS_MAPPER = {
  /** 즉시 결제가 아닌, 호스트의 승인이 필요함으로 승인을 요청한 상태의 예약 */
  APPROVED_PENDING: "승인 대기",
  /** 호스트의 승인이 완료되어 결제가 필요한 예약 */
  APPROVED: "결제 대기",
  /** 리뷰 작성 유무 상관 없이 이용이 완료된 예약 */
  USED: "이용 완료",
  /** 사용자가 예약 요청한 이후 승인을 거절한 예약 */
  CANCELED: "승인 거절",
  /** 환불된 예약 */
  REFUND: "예약 취소",
  /** 결제 완료된 예약 */
  BEFORE_USAGE: "예약 확정",
} as const;

export const TAG_RESERVATION_COLOR_MAPPER: Record<keyof typeof RESERVATION_STATUS_MAPPER, Color> = {
  BEFORE_USAGE: "primary",
  APPROVED_PENDING: "bw",
  USED: "bw",
  APPROVED: "bw",
  CANCELED: "primary",
  REFUND: "primary",
};

export const RESERVATION_STATUS_TEXT_MAPPER: Record<keyof typeof RESERVATION_STATUS_MAPPER, string> = {
  APPROVED_PENDING: "\n예약 요청이 완료되었어요.",
  APPROVED: "\n호스트 승인이 완료되었어요.",
  CANCELED: "\n요청이 취소된 예약입니다.",
  BEFORE_USAGE: "\n예약이 완료되었어요.",
  USED: "에서의\n낭만적인 시간",
  REFUND: "\n취소된 예약입니다.",
};
