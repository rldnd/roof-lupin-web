import type { NotNullable } from "./types";
import type { BasePackageRentalType, BaseTimeRentalType, RentalType } from "@/common/types/rentalType";
import type { ReservationTime } from "@/states";

export const isPackageRentalType = (rentalType: RentalType): rentalType is BasePackageRentalType =>
  rentalType.rentalType === "PACKAGE";

export const isTimeRentalType = (rentalType: RentalType): rentalType is BaseTimeRentalType =>
  rentalType.rentalType === "TIME";

export const isUnderTimeReservation = (time: ReservationTime): time is NotNullable<ReservationTime> => {
  return Boolean(time.rentalTypeId) && typeof time.startAt === "number" && typeof time.endAt === "number";
};
