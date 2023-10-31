"use client";

import { useParams, useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import type { SpaceDetail } from "@/common/types/space";
import { Button } from "@/components";
import { useSuspenseQuery } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { prepareReservationApi } from "@/services/reservation";
import { getClientSpaceApi } from "@/services/space";
import {
  reservationAdditionalServicesState,
  reservationCouponState,
  reservationPackageState,
  reservationState,
  reservationTimeState,
} from "@/states";
import { getPrepareReservationBody } from "@/utils/reservation";

import styles from "./submitButton.module.scss";

const Submit: React.FC = () => {
  const { replace } = useRouter();
  const { spaceId } = useParams();
  const { me } = useMe();

  const { mutate: prepareReservation } = useMutation(prepareReservationApi, {
    onSuccess: (data) => {
      const reservationId = data.data.id;
      replace(`/spaces/${spaceId}/reservations/${reservationId}/request-complete`);
    },
  });

  const { data: space } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));

  const reservation = useAtomValue(reservationState);
  const time = useAtomValue(reservationTimeState);
  const packages = useAtomValue(reservationPackageState);
  const additionalServices = useAtomValue(reservationAdditionalServicesState);
  const coupons = useAtomValue(reservationCouponState);

  const disabled = !reservation.userName || !reservation.userPhoneNumber;

  const onClickButton = () => {
    const body = getPrepareReservationBody(
      reservation,
      time,
      packages,
      additionalServices,
      coupons,
      space.overflowUserCost,
      space.overflowUserCount,
    );
    if (!body) return;

    prepareReservation(body);
  };

  return (
    <section className={styles.wrapper}>
      <Button
        type="button"
        color="primary"
        full
        className={styles.submitButton}
        disabled={disabled}
        onClick={onClickButton}
      >
        {me?.isCertified && me.setting.isAdult && <>지금 예약 요청하기</>}
        {(!me?.isCertified || !me.setting.isAdult) && <>본인인증 필요</>}
      </Button>
    </section>
  );
};

export default Submit;

export const LoadingSubmit: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <Button type="button" color="primary" full className={styles.submitButton} disabled>
        지금 예약 요청하기
      </Button>
    </section>
  );
};
