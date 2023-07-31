import type { CreateReservation, CreateReservationRentalType } from "@/common/types/reservation";
import type { AdditionalServiceReservation } from "@/common/types/service";
import type {
  Reservation,
  ReservationAdditionalService,
  ReservationPackage,
  ReservationTime,
} from "@/states/reservation";

export const getPrepareReservationBody = (
  reservation: Reservation,
  time: ReservationTime,
  packages: ReservationPackage[],
  additionalServices: ReservationAdditionalService,
): CreateReservation | null => {
  const { year, month, day, userName, userPhoneNumber, userCount, spaceId } = reservation;
  const rentalTypes = getRentalTypes(time, packages, additionalServices);

  if (!year || !month || !day || !userName || !userPhoneNumber || !userCount || !spaceId) return null;

  return {
    year,
    month,
    day,
    userName,
    userPhoneNumber,
    userCount,
    spaceId,
    rentalTypes,
    discountCost: 0,
    originalCost: 0,
    totalCost: 0,
    userCouponIds: [],
  };
};

const getRentalTypes = (
  time: ReservationTime,
  packages: ReservationPackage[],
  additionalServices: ReservationAdditionalService,
): CreateReservationRentalType[] => {
  const rentalTypes: CreateReservationRentalType[] = [];

  console.log({ time, packages });

  if (time.rentalTypeId && time.startAt && time.endAt) {
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
