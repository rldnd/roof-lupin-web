export interface RefundPolicy {
  /** 환불 정책 id */
  id: string;
  /** 환불률 */
  refundRate: number;
  /** 환불 기한 */
  dueDate: number;
  /** 환불 기한 타입 */
  dueDateType: number;
}
