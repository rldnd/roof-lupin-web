export interface CreateReservationRentalType {
  /** 대여 id */
  rentalTypeId: string;
  /** 대여 시작 시간 */
  startAt: number;
  /** 대여 종료 시간 */
  endAt: number;
}

export interface AdditionalServiceReservation {
  /** 추가 서비스 아이디 */
  id: string;
  /** 추가 서비스 개수 */
  count: number;
}

export interface CreateReservation {
  /** 예약 연도 */
  year: string;
  /** 예약 월 */
  month: string;
  /** 예약 일 */
  day: string;
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
  /** 추가 서비스들 */
  additionalServices?: AdditionalServiceReservation[];
  /** 승인결제 예약 id */
  reservationId?: string;
}
