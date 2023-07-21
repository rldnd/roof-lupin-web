import { atom } from "jotai";

import type { CreateReservation, CreateReservationRentalType } from "@/common/types/reservation";
import type { AdditionalService } from "@/common/types/service";
import type { Nullable } from "@/utils/types";

export interface Reservation extends Nullable<CreateReservation> {}

export interface ReservationAdditionalService extends AdditionalService {
  count: number;
}

export interface ReservationTime extends Nullable<CreateReservationRentalType> {
  cost: number | null;
}

export interface ReservationPackage extends Nullable<CreateReservationRentalType> {
  name: string | null;
}

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
  additionalServices: [],
};

export const initialReservationPackage: ReservationPackage = {
  name: null,
  endAt: null,
  rentalTypeId: null,
  startAt: null,
  additionalServices: [],
};

/** 예약 및 결제에서 쓰이는 정보 */
export const reservationState = atom<Reservation>(initialReservation);
/** 추가 가능한 부가 서비스들 리스트 */
export const reservationAdditionalServicesState = atom<ReservationAdditionalService[]>([]);
/** 선택한 시간 */
export const reservationTimeState = atom<ReservationTime>(initialReservationTime);
/** 선택한 패키지 리스트 */
export const reservationPackageState = atom<ReservationPackage[]>([]);
