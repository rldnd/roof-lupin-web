export const RESERVATION_STATUS_MAPPER = {
  /** 즉시 결제가 아닌, 호스트의 승인이 필요함으로 승인을 요청한 상태의 예약 */
  APPROVED_PENDING: "승인 대기",
  /** 호스트의 승인이 완료되어 결제가 필요한 예약 */
  APPROVED: "결제 대기",
  /** 리뷰 작성 유무 상관 없이 이용이 완료된 예약 */
  USED: "이용 완료",
  /** 호스트가 승인을 거절한 예약 */
  HOST_CANCELED: "승인 거절",
  /** 환불된 예약 */
  REFUND: "예약 취소",
  /** 결제 완료된 예약 */
  BEFORE_USAGE: "예약 확정",
} as const;

export const TAG_RESERVATION_STATUS_MAPPER: Record<
  keyof typeof RESERVATION_STATUS_MAPPER,
  "primary" | "secondary" | null
> = {
  BEFORE_USAGE: "primary",
  APPROVED_PENDING: "secondary",
  USED: null,
  APPROVED: "secondary",
  HOST_CANCELED: "primary",
  REFUND: "primary",
};
