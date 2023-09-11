import type { CreateReservation } from "./reservation";

export interface CreatePayment extends CreateReservation {}

export interface CreatePaymentPayload extends CreatePayment {}

export interface EscrowProduct {
  /** 상품 id */
  id: string;
  /** 상품의 이름 */
  name: string;
  /** 상품 관리 코드 */
  code: string;
  /** 상품 가격 */
  unitPrice: string;
  /** 상품 수량 */
  quantity: string;
}

export interface Product {
  /** 상품 이름 */
  name: string;
  /** 상품 수량 */
  quantity: number;
  /** 상품 가격 */
  unitAmount: number;
  /** 통화 */
  currency: string;
  /** 설명 */
  description: string;
}

export interface PaymentPayload {
  /** 가격 */
  amount: number;
  /** 주문 구분 ID */
  orderId: string;
  /** 주문명 */
  orderName: string;
  /** 성공 url */
  successUrl: string;
  /** 실패 url */
  failUrl: string;
  /** 고객 이메일 */
  customerEmail: string | null;
  /** 고객 이름 */
  customerName: string | null;
  /** 페이북/ISP앱에서 상점 앱으로 돌아올 때 사용되는 상점의 앱 스킴 */
  appScheme: string | null;
  /** 면세 금액 */
  taxFreeAmount: number | null;
  /** 과세를 제외한 결제금액 (컵 보증금 등) */
  taxExemptionAmount: number | null;
  /** 문화비 지출여부 */
  cultureExpense: boolean | null;
  /** 에스크로 사용 여부 */
  useEscrow: boolean | null;
  /** 상품 정보 객체 배열(가상계좌,계좌이체에서 에스크로 사용 시 필수) */
  escrowProducts: EscrowProduct | null;
  /** 고객의 휴대폰 번호, 가상계좌 입금 안내 */
  customerMobilePhone: string | null;
  /** 휴대폰 결제창 통신사 */
  mobileCarrier: string[] | null;
  /** 상품 정보 객체 */
  products: Product[] | null;
}

export interface ConfirmTossPayment {
  /** 결제키 */
  paymentKey: string;
  /** 주문번호 */
  orderId: string;
  /** 결제된 금액 */
  amount: number;
  /** 결제 정보 */
  paymentInfo: CreatePaymentPayload;
}

export interface RefundPayment {
  /** 예약 id */
  reservationId: string;
  /** 취소 사유 */
  cancelReason: string;
}
