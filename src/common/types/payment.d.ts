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

export interface PrepareKakaoPayment {
  /** 요청한 클라이언트가 모바일 앱일 경우 카카오톡 결제 페이지 */
  nextRedirectAppUrl: string;
  /** 요청한 클라이언트가 모바일 웹일 경우 카카오톡 결제 페이지 */
  nextRedirectMobileUrl: string;
  /** 요청한 클라이언트가 PC 웹일 경우 카카오톡 결제 페이지 */
  nextRedirectPcUrl: string;
  /** 카카오페이 결제 화면로 이동하는 Android 앱 스킴 (Scheme) */
  androidAppScheme: string;
  /** 카카오페이 결제 화면으로 이동하는 ios 앱 스킴 */
  iosAppScheme: string;
  /** 주문 ID */
  orderId: string;
  /** 주문 결과 ID */
  orderResultId: string;
}
