import { PAYMENT_METHODS } from "@/common/constants/payment";

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export interface ConfirmTossPayment {
  /** 결제키 */
  paymentKey: string;
  /** 주문번호 */
  orderId: string;
  /** 결제된 금액 */
  amount: number;
}
