export interface Refund {
  /** 환불 금액 */
  refundCost: number;
  /** 환불 사유 */
  reason: string;
  /** 유저 아이디 */
  userId: string;
  /** 호스트 아이디 */
  hostId: string;
}

export interface RefundPolicy {
  /** 환불 정책 id */
  id: string;
  /** 환불률 */
  refundRate: number;
  /** ~일 전 */
  daysBefore: number;
}
