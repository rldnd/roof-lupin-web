export const RESERVATION_STATUS_MAPPER = {
  APPROVED_PENDING: "승인 대기",
  APPROVED: "승인 완료",
  USED: "사용 완료",
  USED_CANCELED: "사용 취소",
  HOST_CANCELED: "승인 거절",
  REFUND: "환불 완료",
  BEFORE_USAGE: "결제 완료",
} as const;
