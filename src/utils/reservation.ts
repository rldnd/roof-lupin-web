import type { CreateReservation, CreateReservationRentalType } from "@/common/types/reservation";
import type { AdditionalServiceReservation } from "@/common/types/service";
import type {
  Reservation,
  ReservationAdditionalService,
  ReservationPackage,
  ReservationTime,
} from "@/states/reservation";

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

const getRentalTypes = (
  time: ReservationTime,
  packages: ReservationPackage[],
  additionalServices: ReservationAdditionalService,
): CreateReservationRentalType[] => {
  const rentalTypes: CreateReservationRentalType[] = [];

  if (isUnderTimeReservation(time)) {
    // NOTE: 서버에서 endAt은 {hour}~{hour+1} 에서 hour 기준이기 때문에, -1 해줘야 함
    const endAt = time.endAt === 0 ? 23 : time.endAt - 1;

    rentalTypes.push({
      rentalTypeId: time.rentalTypeId,
      startAt: time.startAt,
      endAt,
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

const getCreateAdditionalService = (
  rentalTypeId: string,
  additionalServices: ReservationAdditionalService,
): AdditionalServiceReservation[] => {
  if (!(rentalTypeId in additionalServices)) return [];

  return additionalServices[rentalTypeId].reduce<AdditionalServiceReservation[]>((acc, cur) => {
    if (cur.count === 0) return acc;
    return [...acc, { id: cur.id, count: cur.count }];
  }, []);
};

const getOriginalCost = (
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

const getTimeCost = (time: ReservationTime): number => {
  const { cost, startAt, endAt } = time;
  if (!endAt || !startAt || !cost) return 0;
  return cost;
};

const getPackageCost = (packages: ReservationPackage[]) => {
  return packages.reduce<number>((acc, cur) => acc + cur.baseCost, 0);
};

const getAdditionalServiceCost = (
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

const getAdditionalUserPrice = (userCount: number, overflowUserCost: number, overflowUserCount: number) => {
  if (!userCount || userCount <= overflowUserCount) return 0;
  return overflowUserCost * (userCount - overflowUserCount);
};
