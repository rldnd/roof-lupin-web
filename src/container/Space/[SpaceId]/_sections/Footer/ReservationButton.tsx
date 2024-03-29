"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

import { useAtomValue } from "jotai";

import type { PossibleRentalTypes } from "@/common/types/rentalType";
import type { SpaceDetail } from "@/common/types/space";
import { AuthChecker, Button } from "@/components";
import { useQueryString, useSuspenseQuery } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { getSpaceRentalTypePossibleApi } from "@/services/rentalType";
import { getClientSpaceApi } from "@/services/space";
import { RESERVATION_TAB_MAPPER, spaceReservationInfoState } from "@/states";

const ReservationButton: React.FC = () => {
  const { push } = useRouter();
  const { set, getQueryStringWithPath } = useQueryString();

  const pathname = usePathname();
  const { spaceId } = useParams();

  const spaceReservationInfo = useAtomValue(spaceReservationInfoState);

  const { year, month, day, userCount } = spaceReservationInfo;

  const { isLogined } = useMe();

  const { data: space } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));
  const { data: rentalTypes } = useSuspenseQuery<PossibleRentalTypes>(
    ["getSpaceRentalTypePossible", spaceId, year, month, day],
    () => getSpaceRentalTypePossibleApi({ spaceId, year: year!, month: month!, day: day! }),
    {
      enabled: Boolean(year) && Boolean(month) && Boolean(day) && isLogined,
    },
  );

  const onClickButton = () => {
    if (!year || !month || !day || !userCount) return;

    const tab = space.isImmediateReservation
      ? RESERVATION_TAB_MAPPER.RESERVATION
      : RESERVATION_TAB_MAPPER.REQUEST_RESERVATION;

    push(getQueryStringWithPath(set({ year, month, day, userCount, tab }), `${pathname}/reservations`));
  };

  return (
    <AuthChecker afterLoginPath={`/spaces/${spaceId}`}>
      <Button
        color="primary"
        onClick={onClickButton}
        disabled={
          !rentalTypes?.time &&
          (!Array.isArray(rentalTypes?.package) || rentalTypes.package.filter((item) => item.isPossible).length === 0)
        }
      >
        {space.isImmediateReservation ? "예약하기" : "예약 요청하기"}
      </Button>
    </AuthChecker>
  );
};

export default ReservationButton;

export const LoadingReservationButton: React.FC = () => {
  return (
    <Button color="primary" disabled>
      예약 확인 중
    </Button>
  );
};
