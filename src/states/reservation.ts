import { atom } from "jotai";

import {
  RESERVATION,
  RESERVATION_ADDITIONAL_SERVICES,
  RESERVATION_COUPON,
  RESERVATION_DEPOSIT_CONFIRM,
  RESERVATION_PACKAGE,
  RESERVATION_TIME,
} from "@/common/constants";
import type { UserCoupon } from "@/common/types/coupon";
import type { CreateReservation, CreateReservationRentalType } from "@/common/types/reservation";
import type { AdditionalService } from "@/common/types/service";
import { sessionPersistenceAtom } from "@/utils/jotai";
import type { Nullable } from "@/utils/types";

export const RESERVATION_TAB_MAPPER = {
  RESERVATION: "reservation",
  REQUEST_RESERVATION: "requestReservation",
  PAYMENT: "payment",
  REQUEST_PAYMENT: "requestPayment",
} as const;

export type Tab = (typeof RESERVATION_TAB_MAPPER)[keyof typeof RESERVATION_TAB_MAPPER];

export interface Reservation extends Nullable<CreateReservation> {}

export interface BaseReservationAdditionalService extends AdditionalService {
  count: number;
}

/** [rentalTypeKey]: BaseReservationAdditionalService[] */
export interface ReservationAdditionalService {
  [key: string]: BaseReservationAdditionalService[];
}

export interface ReservationTime extends Nullable<Omit<CreateReservationRentalType, "additionalServices">> {
  cost: number | null;
}

export interface ReservationPackage extends Omit<CreateReservationRentalType, "additionalServices"> {
  name: string;
  baseCost: number;
}

export type ReservationCoupon = UserCoupon;

export const initialReservation: Reservation = {
  day: null,
  discountCost: null,
  month: null,
  originalCost: null,
  rentalTypes: null,
  spaceId: null,
  totalCost: null,
  userCount: null,
  year: null,
  userName: null,
  userPhoneNumber: null,
  userCouponIds: null,
};

export const initialReservationTime: ReservationTime = {
  rentalTypeId: null,
  startAt: null,
  endAt: null,
  cost: null,
};

export const reservationTabState = atom<Tab | null>(null);

/** 예약 및 결제에서 쓰이는 정보 */
export const reservationState = sessionPersistenceAtom<Reservation>(RESERVATION, initialReservation);
/** 추가 가능한 부가 서비스들 리스트 + count를 여기에 적용 */
export const reservationAdditionalServicesState = sessionPersistenceAtom<ReservationAdditionalService>(
  RESERVATION_ADDITIONAL_SERVICES,
  {},
);
/** 선택한 시간 */
export const reservationTimeState = sessionPersistenceAtom<ReservationTime>(RESERVATION_TIME, initialReservationTime);
/** 선택한 패키지 리스트 */
export const reservationPackageState = sessionPersistenceAtom<ReservationPackage[]>(RESERVATION_PACKAGE, []);
/** 보증금 내용 확인 여부 */
export const reservationDepositConfirmState = sessionPersistenceAtom<boolean>(RESERVATION_DEPOSIT_CONFIRM, false);
/** 선택된 쿠폰 */
export const reservationCouponState = sessionPersistenceAtom<ReservationCoupon[]>(RESERVATION_COUPON, []);
