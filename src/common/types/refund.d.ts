export interface RefundPolicy {
  /** 환불 정책 id */
  id: string;
  /** 환불률 */
  refundRate: number;
  /** ~일 전 */
  daysBefore: number;
}
