import { atom } from "jotai";

import type { CreateReservation } from "@/common/types/reservation";
import type { Nullable } from "@/utils/types";

export interface Reservation extends Nullable<CreateReservation> {}

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
  additionalServices: null,
  reservationId: null,
};

export const reservationState = atom<Reservation>(initialReservation);
