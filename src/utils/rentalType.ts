import type { BasePackageRentalType, BaseTimeRentalType, RentalType } from "@/common/types/rentalType";

export const isPackageRentalType = (rentalType: RentalType): rentalType is BasePackageRentalType =>
  rentalType.rentalType === "PACKAGE";

export const isTimeRentalType = (rentalType: RentalType): rentalType is BaseTimeRentalType =>
  rentalType.rentalType === "TIME";
