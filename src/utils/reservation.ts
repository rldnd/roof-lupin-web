import type { UserCoupon } from "@/common/types/coupon";
import type { CreateReservation, CreateReservationRentalType } from "@/common/types/reservation";
import type { AdditionalServiceReservation } from "@/common/types/service";
import type { Reservation, ReservationAdditionalService, ReservationPackage, ReservationTime } from "@/states";

import { isUnderTimeReservation } from "./rentalType";

export const getPrepareReservationBody = (
  reservation: Reservation,
  time: ReservationTime,
  packages: ReservationPackage[],
  additionalServices: ReservationAdditionalService,
  overflowUserCost: number,
  overflowUserCount: number,
): CreateReservation | null => {
  const { year, month, day, userName, userPhoneNumber, userCount, spaceId } = reservation;

  if (!year || !month || !day || !userName || !userPhoneNumber || !userCount || !spaceId) return null;

  const rentalTypes = getRentalTypes(time, packages, additionalServices);
  const originalCost = getOriginalCost(
    time,
    packages,
    additionalServices,
    userCount,
    overflowUserCost,
    overflowUserCount,
  );

  return {
    year,
    month,
    day,
    userName,
    userPhoneNumber,
    userCount,
    spaceId,
    rentalTypes,
    // TODO: coupon 적용 시 수정해야 함
    discountCost: 0,
    originalCost,
    totalCost: originalCost,
    userCouponIds: [],
  };
};

export const getRentalTypes = (
  time: ReservationTime,
  packages: ReservationPackage[],
  additionalServices: ReservationAdditionalService,
): CreateReservationRentalType[] => {
  const rentalTypes: CreateReservationRentalType[] = [];

  if (isUnderTimeReservation(time)) {
    rentalTypes.push({
      rentalTypeId: time.rentalTypeId,
      startAt: time.startAt,
      endAt: time.endAt,
      additionalServices: getCreateAdditionalService(time.rentalTypeId, additionalServices),
    });
  }

  if (packages.length > 0) {
    packages.forEach((packageItem) => {
      rentalTypes.push({
        rentalTypeId: packageItem.rentalTypeId,
        startAt: packageItem.startAt,
        endAt: packageItem.endAt,
        additionalServices: getCreateAdditionalService(packageItem.rentalTypeId, additionalServices),
      });
    });
  }

  return rentalTypes;
};

export const getCreateAdditionalService = (
  rentalTypeId: string,
  additionalServices: ReservationAdditionalService,
): AdditionalServiceReservation[] => {
  if (!(rentalTypeId in additionalServices)) return [];

  return additionalServices[rentalTypeId].reduce<AdditionalServiceReservation[]>((acc, cur) => {
    if (cur.count === 0) return acc;
    return [...acc, { id: cur.id, count: cur.count }];
  }, []);
};

export const getOriginalCost = (
  time: ReservationTime,
  packages: ReservationPackage[],
  additionalServices: ReservationAdditionalService,
  userCount: number,
  overflowUserCost: number,
  overflowUserCount: number,
) => {
  const timeCost = getTimeCost(time);
  const packageCost = getPackageCost(packages);
  const additionalServiceCost = getAdditionalServiceCost(time, packages, additionalServices);
  const additionalUserCost = getAdditionalUserPrice(userCount, overflowUserCost, overflowUserCount);

  return timeCost + packageCost + additionalServiceCost + additionalUserCost;
};

export const getTimeCost = (time: ReservationTime): number => {
  const { cost, startAt, endAt } = time;
  if (!endAt || !startAt || !cost) return 0;
  return cost;
};

export const getPackageCost = (packages: ReservationPackage[]) => {
  return packages.reduce<number>((acc, cur) => acc + cur.baseCost, 0);
};

export const getAdditionalServiceCost = (
  time: ReservationTime,
  packages: ReservationPackage[],
  additionalServices: ReservationAdditionalService,
) => {
  let cost = 0;

  if (isUnderTimeReservation(time) && time.rentalTypeId in additionalServices) {
    cost += additionalServices[time.rentalTypeId].reduce<number>((acc, cur) => acc + cur.cost * cur.count, 0);
  }

  if (packages.length > 0) {
    cost += packages.reduce<number>((acc, cur) => {
      if (!(cur.rentalTypeId in additionalServices)) return acc;
      return acc + additionalServices[cur.rentalTypeId].reduce<number>((acc, cur) => acc + cur.cost * cur.count, 0);
    }, 0);
  }

  return cost;
};

export const getAdditionalUserPrice = (
  userCount: number | null,
  overflowUserCost: number,
  overflowUserCount: number,
) => {
  if (!userCount || userCount <= overflowUserCount) return 0;
  return overflowUserCost * (userCount - overflowUserCount);
};

export const getDiscountCost = (originalCost: number, userCoupons: UserCoupon[]) => {
  const hasCoupon = userCoupons.length > 0;
  if (!hasCoupon) return 0;

  const { discountType, discountValue } = userCoupons[0].coupon;
  if (discountType === "PERCENTAGE") return originalCost * (discountValue / 100);
  return discountValue;
};
