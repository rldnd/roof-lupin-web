import type { AdditionalServiceReservation } from "./service";

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
  /** 대표 이용자 이름 */
  userName: string;
  /** 대표 이용자 전화번호 */
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
  /** 공간 id */
  spaceId: string;
}
