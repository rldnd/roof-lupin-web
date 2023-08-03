import type { DateDTO } from "./common";
import type { RentalType } from "./rentalType";
import type { AdditionalServiceReservation } from "./service";
import type { Space } from "./space";

import { CommonUser } from "./user";

export interface ReservationRentalType {
  /** 대여 id */
  rentalTypeId: string;
  /** 대여 시작 시간 */
  startAt: number;
  /** 대여 종료 시간 */
  endAt: number;
  /** 대여 타입  */
  rentalType: RentalType;
}

export interface CreateReservationRentalType {
  /** 대여 id */
  rentalTypeId: string;
  /** 대여 시작 시간 */
  startAt: number;
  /** 대여 종료 시간 */
  endAt: number;
  /** 추가 서비스들 */
  additionalServices: AdditionalServiceReservation[];
}

export interface CreateReservation {
  /** 예약 연도 */
  year: string;
  /** 예약 월 */
  month: string;
  /** 예약 일 */
  day: string;
  /** 예약자 이름 */
  userName: string;
  /** 예약자 전화번호 */
  userPhoneNumber: string;
  /** 이용 인원 */
  userCount: number;
  /** 예약 비용 */
  totalCost: number;
  /** 할인 금액 */
  discountCost: number;
  /** 할인제외 예약 비용 */
  originalCost: number;
  /** 대여 타입 들 */
  rentalTypes: CreateReservationRentalType[];
  /** 공간 아이디 */
  spaceId: string;
  /** 유저가 가지고 있는 쿠폰 IDs */
  userCouponIds?: string[];
}

export interface ReservationRental {
  /** 대여 ID */
  rentalTypeId: string;
  /** 대여 시작 시간 */
  startAt: number;
  /** 대여 종료 시간 */
  endAt: number;
  /** 대여 타입 */
  rentalType: RentalType;
}

export interface ReservationDetail extends Omit<DateDTO, "deletedAt"> {
  /** 예약 아이디 */
  id: string;
  /** 예약 년도 */
  year: string;
  /** 예약 월 */
  month: string;
  /** 예약 일 */
  day: string;
  /** 예약 코드 */
  code: string;
  /** 결제 금액 ( originalCost - discountCost ) */
  totalCost: number;
  /** VAT 금액 */
  vatCost: number;
  /** 할인금액 */
  discountCost: number;
  /** 총액 - 할인가가 적용되지 않은 금액 */
  originalCost: number;
  /** 유저 정보 */
  user: CommonUser;
  /** 대여 정보 */
  rentalTypes: ReservationRental[];
  /** 공간 정보 */
  space: Space;
  /** 리뷰 작성 여부 */
  isReviewed: boolean;
  /** 주문 번호 */
  orderId: string | null;
  /** 주문결과번호 */
  orderResultId: string | null;
  /** 결제 방식 */
  payMethod: string | null;
  /** 환불 금액 */
  refundCost: number | null;
  /** 승인 여부 */
  isApproved: boolean;
  /** 승인일 */
  approvedAt: Date;
}
