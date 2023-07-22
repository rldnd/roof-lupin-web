import { atom } from "jotai";

import type { CreateReservation, CreateReservationRentalType } from "@/common/types/reservation";
import type { AdditionalService } from "@/common/types/service";
import type { Nullable } from "@/utils/types";

type Tab = "reservation" | "payment" | "requestReservation";

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

export const reservationTabState = atom<Tab>("reservation");

/** 예약 및 결제에서 쓰이는 정보 */
export const reservationState = atom<Reservation>(initialReservation);
/** 추가 가능한 부가 서비스들 리스트 + count를 여기에 적용 */
export const reservationAdditionalServicesState = atom<ReservationAdditionalService>({});
/** 선택한 시간 */
export const reservationTimeState = atom<ReservationTime>(initialReservationTime);
/** 선택한 패키지 리스트 */
export const reservationPackageState = atom<ReservationPackage[]>([]);
/** 보증금 내용 확인 여부 */
export const reservationDepositConfirmState = atom<boolean>(false);
